import {useEffect, useRef} from "react";
import {useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// @ts-ignore
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import proj4 from "proj4";

;(window as any).proj4 = proj4;


export default function RasterLayer({
                                        url,
                                        opacity = 1,
                                        colorFn,
                                        onReady,
                                        fitBounds = false,
                                    }: {
    url: string;
    opacity?: number;
    colorFn?: (values: number[]) => string;
    onReady?: (georaster: any) => void;
    fitBounds?: boolean;
}) {
    const map = useMap();
    const layerRef = useRef<any>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            const resp = await fetch(url, {cache: "no-store"});
            if (!resp.ok) throw new Error(`Falha ao carregar ${url}`);
            const arrayBuffer = await resp.arrayBuffer();
            const georaster: any = await parseGeoraster(arrayBuffer);

            const mins = Array.isArray(georaster.mins) ? georaster.mins : [georaster.mins ?? 0];
            const maxs = Array.isArray(georaster.maxs) ? georaster.maxs : [georaster.maxs ?? 1];
            const min = Number.isFinite(mins[0]) ? mins[0] : 0;
            const max = Number.isFinite(maxs[0]) && maxs[0] !== mins[0] ? maxs[0] : min + 1e-6;

            const defaultColorFn = (values: number[]) => {
                const v = values?.[0];
                if (v == null || Number.isNaN(v)) return "rgba(0,0,0,0)";
                const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
                const g = Math.round(t * 255);
                return `rgba(${g},${g},${g},1)`;
            };

            const layer = new (GeoRasterLayer as any)({
                georaster,
                opacity,
                resolution: 20,
                pixelValuesToColorFn: colorFn || defaultColorFn,
            });

            if (cancelled) return;

            layer.addTo(map);
            layerRef.current = layer;

            if (fitBounds) {
                const {xmin, ymin, xmax, ymax} = georaster;
                const bounds = L.latLngBounds([ymin, xmin], [ymax, xmax]);
                if (bounds.isValid()) {
                    map.fitBounds(bounds, {padding: [4, 4]});
                }
            }

            onReady?.(georaster);
        })().catch((err) => console.error("Erro carregando GeoTIFF:", err));

        return () => {
            cancelled = true;
            try {
                layerRef.current?.remove();
            } catch {
            }
            layerRef.current = null;
        };
    }, [map, url, opacity, fitBounds]);

    return null;
}

