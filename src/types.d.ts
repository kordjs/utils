import { BoxBuilder } from './console/styles';
import { Codes } from './console/codes';
import { ThemeRegistry } from './console/misc/themes';
import { Icons } from './console/misc/icons';

export type ThemeKey = keyof typeof ThemeRegistry;

export type IconKey = keyof typeof Icons;

export type CodeKey = keyof typeof Codes;

export type ColorFn = (...args: unknown[]) => string;

export type Chain = {
    [K in CodeKey]: Chain & ColorFn;
} & ColorFn & {
        icons: {
            [K in IconKey]: Chain & ColorFn;
        };
        strip: (...args: unknown[]) => string;
        use: (name: ThemeKey) => Chain;
        box: (text: string) => BoxBuilder;
        registerTheme: (name: string, styles: string[]) => void;
    };

export type StyleKey = keyof typeof codes | `bg${Capitalize<keyof typeof codes>}`;
