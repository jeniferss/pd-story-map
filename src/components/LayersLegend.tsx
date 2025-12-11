type LayerInfo = {
    name: string;
    color: string;
    type: 'polygon' | 'raster';
};

const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function LayersLegend({layers}: { layers: LayerInfo[] }) {
    const itemsPerColumn = 12;
    const numColumns = Math.ceil(layers.length / itemsPerColumn);

    const getColumnLayers = (colIndex: number) => {
        const start = colIndex * itemsPerColumn;
        const end = start + itemsPerColumn;
        return layers.slice(start, end);
    };

    return (
        <div style={{
            padding: '1rem',
            height: 'fit-content'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
                gap: '1.5rem',
            }}>
                {Array.from({length: numColumns}).map((_, colIndex) => (
                    <div key={colIndex} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        fontSize: '0.8125rem'
                    }}>
                        {getColumnLayers(colIndex).map((layer, idx) => (
                            <div key={idx}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.25rem'
                                }}>
                                    <div style={{
                                        width: '1.25rem',
                                        height: '1.25rem',
                                        backgroundColor: hexToRgba(layer.color, 0.2),
                                        border: `0.08rem solid ${layer.color}`,
                                        borderRadius: '0.1875rem',
                                        flexShrink: 0
                                    }}/>
                                    <span style={{color: '#555', fontWeight: '500'}}>{layer.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

