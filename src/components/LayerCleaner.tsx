import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

type LayerCleanerProps = {
    triggerIndex: number;
};

export default function LayerCleaner({ triggerIndex }: LayerCleanerProps) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;
        const layersToRemove: L.Layer[] = [];

        map.eachLayer((layer) => {
            if (
                layer instanceof L.Marker ||
                layer instanceof L.Polyline ||
                layer instanceof L.Polygon ||
                layer instanceof L.Circle ||
                layer instanceof L.GeoJSON
            ) {
                layersToRemove.push(layer);
            }
        });

        layersToRemove.forEach((layer) => {
            map.removeLayer(layer);
        });
    }, [triggerIndex, map]);

    return null;
}
