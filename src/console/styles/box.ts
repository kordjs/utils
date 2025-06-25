import type { ColorFn } from '../../types';

export class BoxBuilder {
    private content: string;
    private borderChar: string = '-';
    private paddingSize: number = 4;
    private colorFn: ColorFn = (...args: unknown[]) => args.join(' ');

    public constructor(content: string) {
        this.content = content;
    }

    public border(char: string) {
        this.borderChar = char;
        return this;
    }

    public padding(size: number) {
        this.paddingSize = size;
        return this;
    }

    public color(fn: ColorFn) {
        this.colorFn = fn;
        return this;
    }

    public render(): string {
        const lines = this.content.split('\n');
        const paddedLines = lines.map(
            (line) => ' '.repeat(this.paddingSize) + line + ' '.repeat(this.paddingSize)
        );
        const maxLength = Math.max(...paddedLines.map((l) => l.length));
        const horizontal = this.borderChar.repeat(maxLength + 2);
        const top = `┌${horizontal}┐`;
        const bottom = `└${horizontal}┘`;
        const body = paddedLines.map((l) => `│ ${l.padEnd(maxLength)} │`).join('\n');

        const fullBox = [top, body, bottom].join('\n');
        return this.colorFn(fullBox);
    }
}

export const box = (text: string) => new BoxBuilder(text);
