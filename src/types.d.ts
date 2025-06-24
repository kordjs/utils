import { BoxBuilder } from './console/styles';
import { Codes } from './console/codes';
import { Themes } from "./console/misc/themes";

export type ThemeKey = keyof typeof Themes;

export type CodeKey = keyof typeof Codes;

export type ColorFn = (text: string) => string;

export type Chain = {
    [K in CodeKey]: Chain & ColorFn;
} & ColorFn & {
        strip: (text: string) => string;
        use: (name: ThemeKey) => Chain;
        box: (text: string) => BoxBuilder;
    };

export type StyleKey = keyof typeof codes | `bg${Capitalize<keyof typeof codes>}`;
