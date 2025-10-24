import React, {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {GeoJSON, MapContainer, TileLayer, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {LatLngExpression} from 'leaflet';
import L from 'leaflet';
import type {Feature, FeatureCollection, Geometry} from 'geojson';

type LayerHandle = {
    getBounds: () => L.LatLngBounds | null;
};

type LayerRegistryValue = {
    register: (id: string, handle: LayerHandle) => void;
    get: (id: string) => LayerHandle | null;
};

const LayerRegistryContext = createContext<LayerRegistryValue | null>(null);

function useLayerRegistry() {
    const ctx = useContext(LayerRegistryContext);
    if (!ctx) throw new Error('LayerRegistryContext not found');
    return ctx;
}

function LayerRegistryProvider({children}: { children: React.ReactNode }) {
    const registryRef = useRef<Map<string, LayerHandle>>(new Map());

    const register = useCallback((id: string, handle: LayerHandle) => {
        registryRef.current.set(id, handle);
    }, []);

    const get = useCallback((id: string) => {
        return registryRef.current.get(id) ?? null;
    }, []);

    const value = useMemo(() => ({register, get}), [register, get]);
    return <LayerRegistryContext.Provider value={value}>{children}</LayerRegistryContext.Provider>;
}

type FlyStep =
    | { type: 'fly'; center: LatLngExpression; zoom?: number; delayMs?: number; durationSec?: number }
    | { type: 'fit'; layerId: string; padding?: [number, number]; delayMs?: number; durationSec?: number }
    | { type: 'wait'; delayMs: number };

function FlyPipeline({steps}: { steps: FlyStep[] }) {
    const map = useMap();
    const {get} = useLayerRegistry();

    useEffect(() => {
        let cancelled = false;

        const wait = (ms: number) =>
            new Promise<void>((resolve) => {
                const t = setTimeout(() => resolve(), ms);
                return t;
            });

        const waitForEnd = () =>
            new Promise<void>((resolve) => {
                const onEnd = () => {
                    map.off('moveend', onEnd);
                    resolve();
                };
                map.on('moveend', onEnd);
            });

        (async () => {
            for (const s of steps) {
                if (cancelled) return;
                if (s.delayMs && s.delayMs > 0) await wait(s.delayMs);
                if (cancelled) return;

                if (s.type === 'wait') {
                    continue;
                }

                if (s.type === 'fly') {
                    map.flyTo(s.center, s.zoom ?? map.getZoom(), {
                        animate: true,
                        duration: s.durationSec ?? 1.2
                    });
                    await waitForEnd();
                    continue;
                }

                if (s.type === 'fit') {
                    const handle = get(s.layerId);
                    const b = handle?.getBounds();
                    if (b && b.isValid()) {
                        map.fitBounds(b, {
                            padding: s.padding ?? [16, 16],
                            animate: true,
                            duration: s.durationSec ?? 1.2
                        } as any); // Leaflet's typing may not include duration; runtime supports it.
                        await waitForEnd();
                    }

                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [map, steps, get]);

    return null;
}

type GeoJsonLayerProps = Omit<React.ComponentProps<typeof GeoJSON>, 'data'> & {
    dataUrl: string;
    layerId: string;
};

function GeoJsonLayer({dataUrl, layerId, style, ...rest}: GeoJsonLayerProps) {
    const [data, setData] = useState<FeatureCollection<Geometry> | Feature<Geometry> | null>(null);
    const geoRef = useRef<L.GeoJSON<any>>(null);
    const {register} = useLayerRegistry();

    useEffect(() => {
        let active = true;
        (async () => {
            const r = await fetch(dataUrl);
            const json = await r.json();
            if (active) setData(json);
        })();
        return () => {
            active = false;
        };
    }, [dataUrl]);

    useEffect(() => {
        register(layerId, {
            getBounds: () => {
                const inst = geoRef.current;
                if (!inst) return null;
                const b = inst.getBounds?.();
                return b && b.isValid() ? b : null;
            }
        });
    }, [layerId, register]);

    return data ? (
        <GeoJSON
            ref={geoRef as any}
            data={data}
            style={style}
            {...rest}
        />
    ) : null;
}

export default function MapLeaflet() {
    const steps: FlyStep[] = [
        {type: 'wait', delayMs: 1500},
        {type: 'fly', center: [-23.3057, -45.9658], zoom: 9, delayMs: 600, durationSec: 2},
        {type: 'fit', layerId: 'jacarei', padding: [24, 24], delayMs: 600, durationSec: 2},

    ];

    return (
        <div style={{width: '600px', height: '500px'}}>
            <MapContainer
                center={[-14.235, -51.9253] as LatLngExpression}
                zoom={4}
                scrollWheelZoom={false}
                style={{width: '100%', height: '100%'}}
            >
                <LayerRegistryProvider>
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                        minZoom={0}
                        maxZoom={20}
                        attribution="&copy; Stadia Maps & OpenMapTiles & OpenStreetMap"
                    />

                    <GeoJsonLayer
                        layerId="jacarei"
                        dataUrl="src/data/limite_municipal_jacarei_2024.geojson"
                        style={{color: '#2A3E5B', weight: 1, fillOpacity: 0.2}}
                    />

                    <FlyPipeline steps={steps}/>
                </LayerRegistryProvider>
            </MapContainer>
        </div>
    );
}
