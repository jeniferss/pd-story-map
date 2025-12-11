import React, {useEffect, useImperativeHandle, useRef, useState, forwardRef} from 'react';
import {GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type {Feature, FeatureCollection, Geometry} from 'geojson';

type GeoJsonLayerProps = Omit<React.ComponentProps<typeof GeoJSON>, 'data'> & {
    dataUrl: string;
    layerId: string;
};

export type GeoJsonLayerRef = L.GeoJSON | null;

const GeoJsonLayer = forwardRef<GeoJsonLayerRef, GeoJsonLayerProps>(
    function GeoJsonLayer({dataUrl, layerId, style, ...rest}, ref) {
        const [data, setData] = useState<FeatureCollection<Geometry> | Feature<Geometry> | null>(null);
        const geoRef = useRef<L.GeoJSON<any> | null>(null);

        // @ts-ignore
        useImperativeHandle(ref, () => geoRef.current, [data]);

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

        return data ? (
            <GeoJSON
                ref={geoRef as any}
                data={data}
                style={style}
                {...rest}
            />
        ) : null;
    }
);

export default GeoJsonLayer;
