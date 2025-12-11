import {useRef} from 'react';
import RasterLayer from '../../components/RasterLayer';
import mapBiomasColorFn from '../../utils/MapbiomasPallete';
import GeoJsonLayer, {type GeoJsonLayerRef} from "../../components/ShapeFileLayer.tsx";
import MapAnimation from "../../components/MapAnimation.tsx";

export default function TempUseShow() {
    const jacareiLayerRef = useRef<GeoJsonLayerRef>(null);

    return (
        <>
            <GeoJsonLayer
                ref={jacareiLayerRef}
                layerId="jacarei"
                dataUrl="src/data/limite_municipal_jacarei_2024.geojson"
                style={{color: '#2A3E5B', weight: 2, fillOpacity: 0.1}}
            />

            <MapAnimation
                steps={[
                    {type: 'fitLayer', layerRef: jacareiLayerRef, padding: [24, 24], delayMs: 600, durationSec: 2}
                ]}
                onComplete={() => {
                    return;
                }}
            />

            <RasterLayer
                url="src/data/LULAC.tif"
                opacity={0.70}
                colorFn={mapBiomasColorFn}
                fitBounds={false}
            />

            <RasterLayer
                url="src/data/LST.tif"
                opacity={0}
                fitBounds={false}
            />


        </>
    );
}