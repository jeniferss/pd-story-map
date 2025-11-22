import {useMemo} from 'react';

// @ts-ignore
import * as geoblaze from 'geoblaze';

const MAPBIOMAS_PALETTE: Record<number, { color: string; label: string }> = {
    3: {color: '#1f8d49', label: 'Formação Florestal'},
    4: {color: '#7dc975', label: 'Formação Savânica'},
    5: {color: '#04381d', label: 'Mangue'},
    6: {color: '#519799', label: 'Floresta Alagável'},
    9: {color: '#7a5900', label: 'Silvicultura'},
    11: {color: '#519799', label: 'Campo Alagado e Área Pantanosa'},
    12: {color: '#d6bc74', label: 'Formação Campestre'},
    15: {color: '#edde8e', label: 'Pastagem'},
    20: {color: '#db7093', label: 'Cana'},
    21: {color: '#ffefc3', label: 'Mosaico de Usos'},
    23: {color: '#ffa07a', label: 'Praia, Duna e Areal'},
    24: {color: '#d4271e', label: 'Área Urbanizada'},
    25: {color: '#db4d4f', label: 'Outras Áreas não Vegetadas'},
    29: {color: '#ffaa5f', label: 'Afloramento Rochoso'},
    30: {color: '#9c0027', label: 'Mineração'},
    31: {color: '#091077', label: 'Aquicultura'},
    32: {color: '#fc8114', label: 'Apicum'},
    33: {color: '#2532e4', label: 'Rio, Lago e Oceano'},
    35: {color: '#9065d0', label: 'Dendê'},
    39: {color: '#f5b3c8', label: 'Soja'},
    40: {color: '#c71585', label: 'Arroz'},
    41: {color: '#f54ca9', label: 'Outras Lavouras Temporárias'},
    46: {color: '#d68fe2', label: 'Café'},
    47: {color: '#9932cc', label: 'Citrus'},
    48: {color: '#e6ccff', label: 'Outras Lavouras Perenes'},
    49: {color: '#02d659', label: 'Restinga Arbórea'},
    50: {color: '#ad5100', label: 'Restinga Herbácea'},
    62: {color: '#ff69b4', label: 'Algodão'},
    75: {color: '#c12100', label: 'Usina Fotovoltaica'},
};

export default function MapBiomasLegend({georaster}: {georaster: any | null}) {
    const uniqueClasses = useMemo(() => {

        if (!georaster) {
            return [];
        }

        try {
            const uniqueSet = new Set<number>();

            if (georaster.values && georaster.values[0]) {
                const rows = georaster.values[0];

                let pixelCount = 0;
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];

                    if (row && row.length) {
                        for (let j = 0; j < row.length; j++) {
                            const val = row[j];
                            pixelCount++;

                            if (val != null && !Number.isNaN(val) && val !== georaster.noDataValue) {

                                const rounded = Math.round(val);
                                if (MAPBIOMAS_PALETTE[rounded]) {
                                    uniqueSet.add(rounded);
                                }
                            }
                        }
                    }
                }
            }

            return Array.from(uniqueSet).sort((a, b) => a - b);
        } catch (err) {
            return [];
        }
    }, [georaster]);

    if (!georaster || uniqueClasses.length === 0) {
        return (
            <div style={{
                padding: '16px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                minWidth: '300px',
                maxWidth: '400px',
                height: 'fit-content'
            }}>
                <p style={{margin: 0, color: '#999'}}>
                    {!georaster ? 'Carregando legenda...' : 'Nenhuma classe encontrada no raster'}
                </p>
            </div>
        );
    }

    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            minWidth: '300px',
            maxWidth: '400px',
            height: 'fit-content'
        }}>
            <h3 style={{
                margin: '0 0 12px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: '#333'
            }}>
                Legenda - Uso e Cobertura do Solo (MapBiomas)
            </h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '8px',
                fontSize: '13px'
            }}>
                {uniqueClasses.map((code) => {
                    const {color, label} = MAPBIOMAS_PALETTE[code];
                    return (
                        <div key={code} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: color,
                                borderRadius: '3px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                flexShrink: 0
                            }} />
                            <span style={{color: '#555'}}>{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

