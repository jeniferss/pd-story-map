// Paleta de cores para temperatura (LST)
// Gradiente: amarelo → laranja → vermelho
export default function lstColorFn(values: number[]): string {
    const v = values[0];
    if (v == null || Number.isNaN(v)) return 'rgba(0,0,0,0)';

    // Temperatura mínima e máxima esperadas (ajuste conforme seus dados)
    const minTemp = 23; // °C
    const maxTemp = 35; // °C

    // Normalizar o valor entre 0 e 1
    const t = Math.max(0, Math.min(1, (v - minTemp) / (maxTemp - minTemp)));

    let r, g, b;

    if (t < 0.5) {
        // Amarelo → Laranja
        const localT = t * 2; // 0 a 1
        r = 255;
        g = Math.round(255 - (localT * 90)); // 255 → 165
        b = 0;
    } else {
        // Laranja → Vermelho
        const localT = (t - 0.5) * 2; // 0 a 1
        r = 255;
        g = Math.round(165 - (localT * 165)); // 165 → 0
        b = 0;
    }

    return `rgba(${r},${g},${b},1)`;
}

