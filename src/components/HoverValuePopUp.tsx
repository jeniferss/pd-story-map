import {useMap} from "react-leaflet";
import {useEffect, useRef} from "react";
import L from "leaflet";

// @ts-ignore
import * as geoblaze from "geoblaze";

export default function HoverValuePopup({
                                            getGeoraster,
                                            format = (v: number) => `${v.toFixed(2)}`,
                                        }: {
    getGeoraster: () => any | null;
    format?: (v: number) => string;
}) {
    const map = useMap();
    const popupRef = useRef<L.Popup | null>(null);

    useEffect(() => {
        const onMove = (e: L.LeafletMouseEvent) => {
            const georaster = getGeoraster();
            if (!georaster) return;

            let value: any = null;
            try {
                value = geoblaze.identify(georaster, [e.latlng.lng, e.latlng.lat]);
            } catch {
                value = null;
            }

            const raw = Array.isArray(value) ? value[0] : value;
            if (raw == null || Number.isNaN(raw)) {
                if (popupRef.current) {
                    map.closePopup(popupRef.current);
                    popupRef.current = null;
                }
                return;
            }

            const html = `
                <div style="font:12px/1.4 system-ui,sans-serif">
                    <b>Temperatura:</b> ${format(Number(raw))} °C
                </div>`;

            if (!popupRef.current) {
                popupRef.current = L.popup({
                    closeButton: false,
                    autoClose: false,
                    closeOnClick: false,
                })
                    .setLatLng(e.latlng)
                    .setContent(html)
                    .openOn(map);
            } else {
                popupRef.current.setLatLng(e.latlng).setContent(html);
            }
        };

        map.on("mousemove", onMove);
        return () => {
            map.off("mousemove", onMove);
            if (popupRef.current) {
                try {
                    map.closePopup(popupRef.current);
                } catch {
                }
                popupRef.current = null;
            }
        };
    }, [map, getGeoraster, format]);

    return null;
}