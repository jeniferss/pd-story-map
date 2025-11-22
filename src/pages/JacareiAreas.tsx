import {useCallback, useRef, useState} from 'react';
import RasterLayer from '../components/RasterLayer';
import HoverValuePopup from '../components/HoverValuePopUp';
import GeoJsonLayer, {type GeoJsonLayerRef} from "../components/ShapeFileLayer.tsx";
import MapAnimation from "../components/MapAnimation.tsx";
import lstColorFn from '../utils/LstPalette';

export default function JacareiAreas() {
    const [lstGeoraster, setLstGeoraster] = useState<any>(null);

    const jacareiLayerRef = useRef<GeoJsonLayerRef>(null);

    const handleLstReady = useCallback((gr: any) => {
        setLstGeoraster(gr);
    }, []);

    return (
        <>
            <GeoJsonLayer
                ref={jacareiLayerRef}
                layerId="jacarei"
                dataUrl="src/data/limite_municipal_jacarei_2024.geojson"
                style={{color: '#2A3E5B', weight: 2, fillOpacity: 0.1}}
            />

            <GeoJsonLayer
                layerId="area-urbana"
                dataUrl="src/data/area_urbana_jacarei.geojson"
                style={{color: '#7B1FA2', weight: 2, fillOpacity: 0.1}}
            />

            <GeoJsonLayer
                layerId="assentamentos"
                dataUrl="src/data/assentamentos_precarios_jacarei.geojson"
                style={{color: '#E53935', weight: 2, fillOpacity: 0.1}}
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
                url="src/data/LST.tif"
                opacity={0.75}
                colorFn={lstColorFn}
                onReady={handleLstReady}
                fitBounds={false}
            />

            <HoverValuePopup
                getGeoraster={() => lstGeoraster}
            />

            {/*<LayersLegend layers={[*/}
            {/*    { name: 'Limite Municipal', color: '#2A3E5B', type: 'polygon' },*/}
            {/*    { name: 'Assentamentos Precários', color: '#E53935', type: 'polygon' },*/}
            {/*    { name: 'Área Urbana', color: '#7B1FA2', type: 'polygon' },*/}
            {/*    { name: 'Temperatura Superficial (LST)', color: '#FFA500', type: 'raster' }*/}
            {/*]} />*/}
        </>
    );
}

