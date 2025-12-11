import {useCallback, useRef, useState} from 'react';
import RasterLayer from '../../components/RasterLayer';
import HoverValuePopup from '../../components/HoverValuePopUp';
import mapBiomasColorFn from '../../utils/MapbiomasPallete';
import GeoJsonLayer, {type GeoJsonLayerRef} from "../../components/ShapeFileLayer.tsx";
import MapAnimation from "../../components/MapAnimation.tsx";

export default function TempUseShow() {
    const jacareiLayerRef = useRef<GeoJsonLayerRef>(null);
    const [lstGeoraster, setLstGeoraster] = useState<any>(null);

    const handleLstReady = useCallback((gr: any) => {
        setLstGeoraster(gr);
    }, []);

    return (
        <>
            <GeoJsonLayer
                ref={jacareiLayerRef}
                layerId="jacarei"
                dataUrl="limite_municipal_jacarei_2024.geojson"
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
                url="LULAC.tif"
                opacity={0.70}
                colorFn={mapBiomasColorFn}
                fitBounds={false}
            />

            <RasterLayer
                url="LST.tif"
                opacity={0}
                onReady={handleLstReady}
                fitBounds={false}
            />

            <HoverValuePopup
                getGeoraster={() => lstGeoraster}
            />

        </>
    );
}