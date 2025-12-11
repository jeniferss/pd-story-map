import {useRef} from 'react';
import GeoJsonLayer, {type GeoJsonLayerRef} from '../../components/ShapeFileLayer';
import MapAnimation from '../../components/MapAnimation';
import CONSTS from "../../utils/conts.ts";

export default function JacareiIntro() {
    const jacareiLayerRef = useRef<GeoJsonLayerRef>(null);

    return (
        <>
            <GeoJsonLayer
                ref={jacareiLayerRef}
                layerId="jacarei"
                dataUrl="limite_municipal_jacarei_2024.geojson"
                style={{color: '#2A3E5B', weight: 2, fillOpacity: 0.2}}
            />

            <MapAnimation
                steps={[
                    {type: 'wait', delayMs: 500},
                    {
                        type: 'fly',
                        center: CONSTS.JACAREI_CENTER,
                        zoom: CONSTS.JACAREI_ZOOM,
                        delayMs: 600,
                        durationSec: 2
                    },
                    {type: 'wait', delayMs: 1500},
                    {type: 'fitLayer', layerRef: jacareiLayerRef, padding: [2, 2], delayMs: 600, durationSec: 2}
                ]}
                onComplete={() => {
                    return;
                }}
            />
        </>

    );
}