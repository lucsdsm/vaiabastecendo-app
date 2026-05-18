type RgbColor = { r: number; g: number; b: number };

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function hexToRgb(hex: string): RgbColor | null {
    const normalized = hex.trim().replace('#', '');

    if (normalized.length === 3) {
        const r = parseInt(normalized[0] + normalized[0], 16);
        const g = parseInt(normalized[1] + normalized[1], 16);
        const b = parseInt(normalized[2] + normalized[2], 16);
        return { r, g, b };
    }

    if (normalized.length !== 6) {
        return null;
    }

    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);

    if ([r, g, b].some((value) => Number.isNaN(value))) {
        return null;
    }

    return { r, g, b };
}

function rgbToHex({ r, g, b }: RgbColor) {
    const toHex = (value: number) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function blendColors(base: RgbColor, target: RgbColor, amount: number) {
    const ratio = clamp(amount, 0, 1);
    return {
        r: base.r + (target.r - base.r) * ratio,
        g: base.g + (target.g - base.g) * ratio,
        b: base.b + (target.b - base.b) * ratio,
    };
}

function relativeLuminance({ r, g, b }: RgbColor) {
    const [rs, gs, bs] = [r, g, b].map((value) => {
        const normalized = value / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Ajusta cores dinamicas para manter legibilidade em temas claros e escuros.
 */
export function getReadableColor(hex: string, isDark: boolean) {
    const rgb = hexToRgb(hex);

    if (!rgb) {
        return hex;
    }

    const minLuminance = isDark ? 0.58 : 0.2;
    const maxLuminance = isDark ? 0.95 : 0.62;

    let current = rgb;
    let luminance = relativeLuminance(current);

    if (isDark && luminance < minLuminance) {
        for (let step = 0; step < 6 && luminance < minLuminance; step += 1) {
            current = blendColors(current, { r: 255, g: 255, b: 255 }, 0.18);
            luminance = relativeLuminance(current);
        }
    }

    if (!isDark && luminance > maxLuminance) {
        for (let step = 0; step < 6 && luminance > maxLuminance; step += 1) {
            current = blendColors(current, { r: 0, g: 0, b: 0 }, 0.18);
            luminance = relativeLuminance(current);
        }
    }

    return rgbToHex(current);
}
