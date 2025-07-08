export function columnize(input: string, targetWidth: number): string {
    const width = stringWidth(input);
    const padding = ' '.repeat(Math.max(0, targetWidth - width));
    return input + padding;
}

export function stringWidth(input: string): number {
    let width = 0;

    for (const char of [...input.normalize()]) {
        const codePoint = char.codePointAt(0);
        if (codePoint == null) continue;

        // Control characters
        if (codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f)) continue;

        // Full-width characters
        if (
            codePoint >= 0x1100 &&
            (codePoint <= 0x115f ||
                codePoint === 0x2329 ||
                codePoint === 0x232a ||
                (codePoint >= 0x2e80 && codePoint <= 0xa4cf && codePoint !== 0x303f) ||
                (codePoint >= 0xac00 && codePoint <= 0xd7a3) ||
                (codePoint >= 0xf900 && codePoint <= 0xfaff) ||
                (codePoint >= 0xfe10 && codePoint <= 0xfe19) ||
                (codePoint >= 0xfe30 && codePoint <= 0xfe6f) ||
                (codePoint >= 0xff00 && codePoint <= 0xff60) ||
                (codePoint >= 0xffe0 && codePoint <= 0xffe6) ||
                (codePoint >= 0x1f300 && codePoint <= 0x1f64f) ||
                (codePoint >= 0x1f900 && codePoint <= 0x1f9ff))
        ) {
            width += 2;
        } else {
            width += 1;
        }
    }

    return width;
}
