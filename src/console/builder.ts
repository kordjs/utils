import type { Chain, IconKey, StyleKey } from '../types';
import { box } from './styles';
import { Themes } from './misc/themes';
import { Codes } from './codes';
import { stripAnsi } from '../utils/console';
import { Icons } from './misc/icons';

export class KordJSChalk {
    private styles: StyleKey[];

    public constructor(styles: StyleKey[] = []) {
        this.styles = styles;
    }

    public format(...args: unknown[]): string {
        return `${this.styles.join('')}${args}${Codes.reset}`;
    }

    public call = (...args: unknown[]) => this.format(args);

    public static create(styles: StyleKey[] = []): Chain {
        const builder = new KordJSChalk(styles);

        const handler: ProxyHandler<object> = {
            get(_, prop: string) {
                if (prop in Codes) {
                    return KordJSChalk.create([...styles, Codes[prop as StyleKey as never]]);
                }

                if (prop === 'format') return builder.format.bind(builder);

                if (prop === 'call') return builder.call;

                if (prop === 'icon') {
                    return new Proxy(() => {}, {
                        get(_, iconName: string) {
                            if (!(iconName in Icons)) {
                                throw new Error(`Unknown icon: ${iconName}`);
                            }

                            const iconValue = Icons[iconName as IconKey];
                            return KordJSChalk.create([...styles, iconValue]);
                        }
                    });
                }

                if (prop === 'use') {
                    return (themeName: keyof typeof Themes): Chain => {
                        const theme = Themes[themeName];
                        if (!theme) throw new Error(`Theme "${themeName}" not found`);
                        let chain = KordJSChalk.create([]);

                        for (const style of theme) {
                            /*if (style.startsWith('icon.')) {
                                const iconName = style.split('.')[1];
                                chain = chain.icon[iconName];
                            } else {
                                chain = (chain as never)[style];
                            }*/

                            chain = (chain as never)[style];
                        }

                        return chain;
                    };
                }

                if (prop === 'strip') {
                    return (text: string): string => {
                        const styled = KordJSChalk.create(styles)(text);
                        return stripAnsi(styled);
                    };
                }

                if (prop === 'box') return (text: string) => box(KordJSChalk.create(styles)(text));

                return (...args: unknown[]) => {
                    throw new Error(`Cannot call unknown method or style: ${String(prop)} ${args}`);
                };
            },

            apply(_, __, argArray) {
                const combined = argArray
                    .map((x) => {
                        if (x instanceof Error) return x.stack || x.message;
                        if (typeof x === 'object') return JSON.stringify(x, null, 2);
                        return String(x);
                    })
                    .join(' ');

                return builder.call(combined);
            }
        };

        return new Proxy(() => {}, handler) as unknown as Chain;
    }
}

export const colors: Chain = KordJSChalk.create();
