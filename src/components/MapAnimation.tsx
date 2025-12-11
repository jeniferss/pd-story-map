import {useEffect, useRef} from 'react';
import {useMap} from 'react-leaflet';
import type {LatLngExpression} from 'leaflet';
import L from 'leaflet';
import type {GeoJsonLayerRef} from './ShapeFileLayer';


export type AnimationStep =
    | { type: 'wait'; delayMs: number }
    | { type: 'fly'; center: LatLngExpression; zoom?: number; delayMs?: number; durationSec?: number }
    | {
    type: 'fitBounds';
    bounds: L.LatLngBoundsExpression;
    padding?: [number, number];
    delayMs?: number;
    durationSec?: number
}
    | {
    type: 'fitLayer';
    layerRef: React.RefObject<GeoJsonLayerRef>;
    padding?: [number, number];
    delayMs?: number;
    durationSec?: number
};

export type MapAnimationProps = {
    steps: AnimationStep[];
    onComplete?: () => void;
};


export default function MapAnimation({steps, onComplete}: MapAnimationProps) {
    const map = useMap();
    const completedRef = useRef(false);

    useEffect(() => {
        let cancelled = false;

        const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
        const waitForEnd = () => new Promise<void>(resolve => {
            const onEnd = () => {
                map.off('moveend', onEnd);
                resolve();
            };
            map.on('moveend', onEnd);
        });

        (async () => {
            for (const step of steps) {
                if (cancelled) return;

                if (step.delayMs && step.delayMs > 0) {
                    await wait(step.delayMs);
                }
                if (cancelled) return;

                switch (step.type) {
                    case 'wait':
                        break;

                    case 'fly':
                        map.flyTo(
                            step.center,
                            step.zoom ?? map.getZoom(),
                            {
                                animate: true,
                                duration: step.durationSec ?? 1.2
                            }
                        );
                        await waitForEnd();
                        break;

                    case 'fitBounds':
                        map.fitBounds(
                            step.bounds,
                            {
                                padding: step.padding ?? [16, 16],
                                animate: true,
                                duration: step.durationSec ?? 1.2
                            } as any
                        );
                        await waitForEnd();
                        break;

                    case 'fitLayer':
                        const layer = step.layerRef.current;
                        if (layer) {
                            const bounds = layer.getBounds();
                            if (bounds.isValid()) {
                                map.fitBounds(
                                    bounds,
                                    {
                                        padding: step.padding ?? [16, 16],
                                        animate: true,
                                        duration: step.durationSec ?? 1.2
                                    } as any
                                );
                                await waitForEnd();
                            }
                        }
                        break;
                }
            }

            if (!cancelled && !completedRef.current) {
                completedRef.current = true;
                await wait(300);
                onComplete?.();
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [map, steps, onComplete]);

    return null;
}

