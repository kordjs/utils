import { BoxBuilder } from './console/styles';
import { Codes } from './console/codes';
import { ThemeRegistry } from './console/misc/themes';
import { Icons } from './console/misc/icons';

export type ThemeKey = keyof typeof ThemeRegistry;

export type ThemeStyle = CodeKey | `bg${Capitalize<CodeKey>}` | `icon.${IconKey}`;

export type IconKey = keyof typeof Icons;

export type CodeKey = keyof typeof Codes;

export type BoxStyle = 'ascii' | 'rounded' | 'double';

export type ColorFn = (...args: unknown[]) => string;

export interface IChainColor extends ColorFn {
  [K in CodeKey]: IChainColor;
}

export interface IChainIcons {
  icons: {
    [K in IconKey]: IChainColor;
  };
}

export interface IChainUtility {
  strip: (...args: unknown[]) => string;
  use: (name: string) => IChain;
  box: (text: string) => BoxBuilder;
  registerTheme: (name: string, styles: ThemeStyle[]) => void;
}

export type Chain = IChainColor & IChainIcons & IChainUtility;

export interface IBoxBuilder {
  style(type: BoxStyle): IBoxBuilder;
  padding(x: number, y?: number): IBoxBuilder;
  color(fn: ColorFn | keyof typeof Codes): IBoxBuilder;
  toString(): string;
}

export type StyleKey = keyof typeof codes | `bg${Capitalize<keyof typeof codes>}`;

