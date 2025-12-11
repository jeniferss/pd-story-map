import {useEffect, useRef} from "react";
import {useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// @ts-ignore
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import proj4 from "proj4";

;(window as any).proj4 = proj4;

type RasterLayerProps = {
    url: string | null;
    opacity?: number;
    colorFn?: (values: number[]) => string;
    onReady?: (georaster: any) => void;
    fitBounds?: boolean;
};

export default function RasterLayer({
                                        url,
                                        opacity = 1,
                                        colorFn,
                                        onReady,
                                        fitBounds = false,
                                    }: RasterLayerProps) {
    const map = useMap();

    const layerRef = useRef<any>(null);

    useEffect(() => {
        if (!url) {
            if (layerRef.current) {
                try {
                    map.removeLayer(layerRef.current);
                } catch {
                }
                layerRef.current = null;
            }
            return;
        }

        let cancelled = false;
        let layer: any = null;

        const run = async () => {
            try {
                const resp = await fetch(url, {cache: "no-store"});
                if (!resp.ok) {
                    throw new Error(`Falha ao carregar raster (${resp.status}): ${url}`);
                }

                const arrayBuffer = await resp.arrayBuffer();
                const georaster: any = await parseGeoraster(arrayBuffer);

                if (cancelled) {
                    return;
                }

                const mins = Array.isArray(georaster.mins)
                    ? georaster.mins
                    : [georaster.mins ?? 0];
                const maxs = Array.isArray(georaster.maxs)
                    ? georaster.maxs
                    : [georaster.maxs ?? 1];
                const min = Number.isFinite(mins[0]) ? mins[0] : 0;
                const max =
                    Number.isFinite(maxs[0]) && maxs[0] !== mins[0]
                        ? maxs[0]
                        : min + 1e-6;

                const defaultColorFn = (values: number[]) => {
                    const v = values?.[0];
                    if (v == null || Number.isNaN(v)) return "rgba(0,0,0,0)";
                    const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
                    const g = Math.round(t * 255);
                    return `rgba(${g},${g},${g},1)`;
                };

                const colorCache = new Map<number, string>();
                const cachedColorFn = (values: number[]) => {
                    const v = values?.[0];
                    if (v == null || Number.isNaN(v)) return "rgba(0,0,0,0)";

                    if (colorCache.has(v)) {
                        return colorCache.get(v)!;
                    }

                    const color = (colorFn || defaultColorFn)(values);
                    colorCache.set(v, color);
                    return color;
                };

                if (typeof Worker !== 'undefined') {
                    const workerCode = `
                        self.onmessage = (e) => {
                            const { min, max, steps } = e.data;
                            const colors = [];
                            for (let i = 0; i < steps; i++) {
                                const v = min + ((max - min) * i / steps);
                                colors.push([v, v]);
                            }
                            self.postMessage({ colors });
                        };
                    `;
                    const blob = new Blob([workerCode], {type: 'application/javascript'});
                    const worker = new Worker(URL.createObjectURL(blob));

                    worker.postMessage({min, max, steps: 256});
                    worker.onmessage = (e) => {
                        e.data.colors.forEach((colorPair: [number, number]) => {
                            cachedColorFn([colorPair[0]]);
                        });
                        worker.terminate();
                    };
                }

                layer = new (GeoRasterLayer as any)({
                    georaster,
                    opacity,
                    resolution: 40,
                    pixelValuesToColorFn: cachedColorFn,
                });

                if (cancelled) {
                    try {
                        map.removeLayer(layer);
                    } catch {
                    }
                    return;
                }

                layer.addTo(map);
                layerRef.current = layer;

                const bounds = layer.getBounds?.() as L.LatLngBounds | undefined;

                if (bounds && bounds.isValid()) {
                    if (fitBounds) {
                        map.fitBounds(bounds, {padding: [4, 4]});
                    }
                }

                onReady?.(georaster);
            } catch (err) {
                console.error("Erro carregando GeoTIFF:", err);
            }
        };

        run();

        return () => {
            cancelled = true;

            if (layer) {
                try {
                    map.removeLayer(layer);
                } catch {
                }
            }

            if (layerRef.current === layer) {
                layerRef.current = null;
            }
        };
    }, [map, url, opacity, fitBounds, colorFn, onReady]);

    return null;
}
