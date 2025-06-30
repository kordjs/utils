import { Codes } from './console/codes';
import { Icons } from './console/misc/icons';
import { ThemeRegistry } from './console/misc/themes';

export type IconKey = keyof typeof Icons;
export type CodeKey = keyof typeof Codes;
export type ThemeKey = keyof typeof ThemeRegistry;
export type StyleKey =
  | keyof typeof Codes
  | `bg${Capitalize<keyof typeof Codes>}`
  | `icon.${keyof typeof Icons}`;

export type BoxStyle = 'ascii' | 'rounded' | 'double';
export type ThemeStyle = CodeKey | `bg${Capitalize<CodeKey>}` | `icon.${IconKey}`;

export type ColorFn = (...args: unknown[]) => string;

export interface IBoxBuilder {
  style(type: BoxStyle): IBoxBuilder;
  padding(x: number, y?: number): IBoxBuilder;
  color(fn: ColorFn | keyof typeof Codes): IBoxBuilder;
  toString(): string;
}
