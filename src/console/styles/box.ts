import type { BoxStyle, ColorFn, IBoxBuilder } from '../../types';
import { KordJSTypeError, ErrorCodes, KordJSError, KordJSRangeError } from '../../utils/errors';
import { Codes } from '../codes';

const BoxStyles: Record<
    BoxStyle,
    {
        topLeft: string;
        topRight: string;
        bottomLeft: string;
        bottomRight: string;
        horizontal: string;
        vertical: string;
    }
> = {
    ascii: {
        topLeft: '+',
        topRight: '+',
        bottomLeft: '+',
        bottomRight: '+',
        horizontal: '-',
        vertical: '|'
    },
    rounded: {
        topLeft: '╭',
        topRight: '╮',
        bottomLeft: '╰',
        bottomRight: '╯',
        horizontal: '─',
        vertical: '│'
    },
    double: {
        topLeft: '╔',
        topRight: '╗',
        bottomLeft: '╚',
        bottomRight: '╝',
        horizontal: '═',
        vertical: '║'
    }
};

export class BoxBuilder {
    private content: string;
    private styleType: BoxStyle = 'ascii';
    private paddingX = 2;
    private paddingY = 0;
    private colorFn: ColorFn = (...args) => args.join(' ');

    public constructor(content: string) {
        if (typeof content !== 'string')
            throw new KordJSTypeError(ErrorCodes.NoTypeMatch, 'string', typeof content);

        if (content.length === 0) throw new KordJSRangeError(ErrorCodes.EmptyString);

        this.content = content;
    }

    public style(type: BoxStyle) {
        if (!(type in BoxStyles))
            throw new KordJSError(
                ErrorCodes.UnknownStyle,
                type,
                Object.keys(BoxStyles)
                    .map((style) => style)
                    .join(', ')
            );

        this.styleType = type;
        return this;
    }

    public padding(x: number, y: number) {
        if (typeof x !== 'number' || typeof y !== 'number')
            throw new KordJSError(
                ErrorCodes.NoTypeMatch,
                'number',
                typeof x !== 'number' ? typeof x : typeof y
            );

        this.paddingX = x;
        this.paddingY = y;
        return this;
    }

    public color(fn: ColorFn | keyof typeof Codes) {
        if (Array.isArray(fn)) throw new KordJSTypeError(ErrorCodes.UnSupportedColorInput);

        if (typeof fn !== 'function' && typeof fn !== 'string')
            throw new KordJSTypeError(ErrorCodes.NoTypeMatch, 'string || function', typeof fn);

        if (typeof fn === 'string') {
            const code = Codes[fn];

            if (!code)
                throw new KordJSError(ErrorCodes.UnknownStyle, fn, Object.keys(Codes).join(', '));

            this.colorFn = (text) => `${code}${text}${Codes.reset}`;
        } else {
            this.colorFn = fn;
        }

        return this;
    }

    public toString(): string {
        const style = BoxStyles[this.styleType];
        const lines = this.content.split('\n');

        const paddedLines = [
            ...Array(this.paddingY).fill(''),
            ...lines.map((line) => ' '.repeat(this.paddingX) + line + ' '.repeat(this.paddingX)),
            ...Array(this.paddingY).fill('')
        ];

        const width = Math.max(...paddedLines.map((l) => l.length));
        const horizontal = style.horizontal.repeat(width);
        const top = `${style.topLeft}${horizontal}${style.topRight}`;
        const bottom = `${style.bottomLeft}${horizontal}${style.bottomRight}`;
        const body = paddedLines
            .map((line) => `${style.vertical}${line.padEnd(width)}${style.vertical}`)
            .join('\n');

        const full = [top, body, bottom].join('\n');
        return this.colorFn(full);
    }
}

export const box = (text: string): IBoxBuilder => new BoxBuilder(text);
