import { Codes } from './codes';
import { Icons } from './misc/icons';
import type { ColorFn } from '../types';
import { BoxBuilder, box as _box } from './styles/box';
import { KordJSError, ErrorCodes } from '../utils/errors';

/**
 * Type representing the style keys available.
 * @typedef {keyof typeof Codes | `bg${Capitalize<keyof typeof Codes>}` | `icon.${keyof typeof Icons}`}
 * @property {string} TStyleKey - The type of style keys, which can be a key from Codes, a bg Color key or an icon key from Icons.
 */
type TStyleKey =
  | keyof typeof Codes
  | `bg${Capitalize<keyof typeof Codes>}`
  | `icon.${keyof typeof Icons}`;

/**
 * Type representing the chain of styles and icons.
 * @typedef {Object} TChain
 */
type TChain = {
  [K in keyof typeof Codes]: TChain & ColorFn;
} & ColorFn & {
    icons: {
      [K in keyof typeof Icons]: TChain & ColorFn;
    };

    format: ColorFn;
    call: ColorFn;
    box: (text: string) => BoxBuilder;
  };

export class KordJSChalk {
  public styles: TStyleKey[];

  public constructor(styles: TStyleKey[] = []) {
    this.styles = styles;
  }

  public format(...args: unknown[]): string {
    const text = args
      .map((x) =>
        x instanceof Error
          ? x.stack || x.message
          : typeof x === 'object'
            ? JSON.stringify(x, null, 2)
            : String(x)
      )
      .join(' ');

    return `${this.styles.join('')}${text}${Codes.reset}`;
  }

  public call = (...args: unknown[]) => this.format(...args);
}

function createProxy(builder: KordJSChalk): TChain {
  return new Proxy(builder.call as unknown as object, {
    get(_, prop: string) {
      if (prop in Codes) {
        return createProxy(
          new KordJSChalk([...builder.styles, Codes[prop as keyof typeof Codes] as TStyleKey])
        );
      }

      if (prop in builder) return (builder as never)[prop];
      if (prop === 'format') return builder.format.bind(builder);
      if (prop === 'call') return builder.call;
      if (prop === 'box') return (text: string) => _box(text);

      if (prop === 'icons') {
        return new Proxy(() => {}, {
          get(_, iconName: string) {
            if (!(iconName in Icons)) throw new KordJSError(ErrorCodes.IconNotFound, iconName);
            return createProxy(
              new KordJSChalk([
                ...builder.styles,
                Icons[iconName as keyof typeof Icons] as TStyleKey
              ])
            );
          }
        });
      }

      return () => {
        throw new KordJSError(ErrorCodes.UnknownProperty, prop);
      };
    },

    apply(_, __, argArray) {
      return builder.call(...argArray);
    }
  }) as unknown as TChain;
}

export const colors: TChain = createProxy(new KordJSChalk());
