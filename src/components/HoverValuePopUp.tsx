import {useMap} from "react-leaflet";
import {useEffect, useRef, useState} from "react";
import type L from "leaflet";
// @ts-ignore
import * as geoblaze from "geoblaze";

type HoverValuePopupProps = {
    getGeoraster: () => any | null;
    format?: (v: number) => string;
    intervalMs?: number;
};

export default function HoverValuePopup({
                                            getGeoraster,
                                            format = (v: number) => `${v.toFixed(2)}`,
                                            intervalMs = 200, 
                                        }: HoverValuePopupProps) {
    const map = useMap();
    const [value, setValue] = useState<number | null>(null);
    const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);

    const lastRunRef = useRef<number>(0);
    const isInteractingRef = useRef<boolean>(false);

    useEffect(() => {
        const onMove = (e: L.LeafletMouseEvent) => {
            if (isInteractingRef.current) return;

            const now = performance.now();
            if (now - lastRunRef.current < intervalMs) return;
            lastRunRef.current = now;

            const georaster = getGeoraster();
            if (!georaster) {
                setValue(null);
                setLatlng(null);
                return;
            }

            let raw: any = null;
            try {
                const v = geoblaze.identify(georaster, [e.latlng.lng, e.latlng.lat]);
                raw = Array.isArray(v) ? v[0] : v;
            } catch {
                raw = null;
            }

            if (raw == null || Number.isNaN(raw)) {
                setValue(null);
                setLatlng(null);
                return;
            }

            setValue(Number(raw));
            setLatlng({lat: e.latlng.lat, lng: e.latlng.lng});
        };

        const markInteracting = () => {
            isInteractingRef.current = true;
            setValue(null);
            setLatlng(null);
        };

        const unmarkInteracting = () => {
            isInteractingRef.current = false;
            lastRunRef.current = 0;
        };

        map.on("mousemove", onMove);
        map.on("zoomstart", markInteracting);
        map.on("zoomend", unmarkInteracting);
        map.on("movestart", markInteracting);
        map.on("moveend", unmarkInteracting);
        map.on("dragstart", markInteracting);
        map.on("dragend", unmarkInteracting);

        return () => {
            map.off("mousemove", onMove);
            map.off("zoomstart", markInteracting);
            map.off("zoomend", unmarkInteracting);
            map.off("movestart", markInteracting);
            map.off("moveend", unmarkInteracting);
            map.off("dragstart", markInteracting);
            map.off("dragend", unmarkInteracting);
        };
    }, [map, getGeoraster, format, intervalMs]);

    if (value == null || !latlng) return null;

    return (
        <div
            style={{
                position: "absolute",
                left: 16,
                bottom: 16,
                padding: "4px 8px",
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                borderRadius: 4,
                fontSize: 12,
                pointerEvents: "none",
                zIndex: 9999,
            }}
        >
            <div><b>Temperatura:</b> {format(value)} °C</div>
            <div style={{opacity: 0.7}}>
                lat: {latlng.lat.toFixed(4)}, lng: {latlng.lng.toFixed(4)}
            </div>
        </div>
    );
}
