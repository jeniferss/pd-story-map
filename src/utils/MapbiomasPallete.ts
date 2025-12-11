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


export default function mapBiomasColorFn(values: number[]): string {
    const v = values[0];
    if (v == null || Number.isNaN(v)) return 'rgba(0,0,0,0)';

    const rounded = Math.round(v);
    const entry = MAPBIOMAS_PALETTE[rounded];

    if (entry) {
        return entry.color;
    }

    return 'rgba(128,128,128,0.3)';
}