import { BoxBuilder } from './console/styles';
import { Codes } from './console/codes';

export type CodeKey = keyof typeof Codes;

export type ColorFn = (text: string) => string;

export type Chain = {
    [K in CodeKey]: Chain & ColorFn;
} & ColorFn & {
        box: (text: string) => BoxBuilder;
    };
