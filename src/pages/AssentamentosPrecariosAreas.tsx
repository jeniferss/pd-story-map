import {useRef} from 'react';
import GeoJsonLayer, {type GeoJsonLayerRef} from "../components/ShapeFileLayer.tsx";
import MapAnimation from "../components/MapAnimation.tsx";

export default function AssentamentosPrecariosAreas() {

    const jacareiLayerRef = useRef<GeoJsonLayerRef>(null);

    return (
        <>
            <GeoJsonLayer
                ref={jacareiLayerRef}
                layerId="jacarei"
                dataUrl="src/data/limite_municipal_jacarei_2024.geojson"
                style={{color: '#2A3E5B', weight: 1, fillOpacity: 0.1}}
            />

            <GeoJsonLayer
                layerId="area-urbana"
                dataUrl="src/data/area_urbana_jacarei.geojson"
                style={{color: '#7B1FA2', weight: 1, fillOpacity: 0.1}}
            />

            <GeoJsonLayer
                layerId="assentamentos"
                dataUrl="src/data/assentamentos_precarios_jacarei.geojson"
                style={{color: '#E53935', weight: 1, fillOpacity: 0.1}}
                eventHandlers={{
                    click: (e: any) => {
                        const props = e.propagatedFrom?.feature?.properties;
                        if (props?.nome) {
                            e.propagatedFrom.bindPopup(`
                                        <div style="font-family: system-ui, sans-serif;">
                                            <h3 style="margin: 0 0 8px 0; font-size: 10px; color: #2F2F2F;">
                                                ${props.nome}
                                            </h3>
                                            <div style="font-size: 8px; color: #B6B6B6;">
                                                <p style="margin: 4px 0;"><strong>Domicílios:</strong> ${props.domicilios}</p>
                                                <p style="margin: 4px 0;"><strong>Remoção:</strong> ${props.remocao}</p>
                                            </div>
                                        </div>
                                    `).openPopup();
                        }
                    }
                }}
            />

            <MapAnimation
                steps={[
                    {
                        type: 'fitLayer',
                        layerRef: jacareiLayerRef,
                        padding: [24, 24],
                        delayMs: 600,
                        durationSec: 2
                    }
                ]}
                onComplete={() => {
                    return;
                }}
            />

            {/*<LayersLegend layers={[*/}
            {/*    {name: 'Limite Municipal', color: '#2A3E5B', type: 'polygon'},*/}
            {/*    {name: 'Assentamentos Precários', color: '#E53935', type: 'polygon'},*/}
            {/*    {name: 'Área Urbana', color: '#7B1FA2', type: 'polygon'},*/}
            {/*]}/>*/}
        </>
    );
}

