type LayerInfo = {
    name: string;
    color: string;
    type: 'polygon' | 'raster';
};

export default function LayersLegend({layers}: {layers: LayerInfo[]}) {
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
                Legenda - Camadas
            </h3>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '13px'
            }}>
                {layers.map((layer, idx) => (
                    <div key={idx}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '4px'
                        }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: layer.type === 'polygon' ? 'transparent' : layer.color,
                                border: layer.type === 'polygon' ? `2px solid ${layer.color}` : '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '3px',
                                flexShrink: 0
                            }} />
                            <span style={{color: '#555', fontWeight: '500'}}>{layer.name}</span>
                        </div>
                        {layer.type === 'raster' && layer.name.includes('Temperatura') && (
                            <div style={{
                                marginLeft: '28px',
                                marginTop: '4px'
                            }}>
                                <div style={{
                                    height: '12px',
                                    background: 'linear-gradient(to right, #FFFF00, #FFA500, #FF0000)',
                                    borderRadius: '3px',
                                    border: '1px solid rgba(0,0,0,0.1)'
                                }} />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '11px',
                                    color: '#666',
                                    marginTop: '2px'
                                }}>
                                    <span>Frio</span>
                                    <span>Quente</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

