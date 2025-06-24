import type { Chain, StyleKey } from '../types';
import { box } from './styles';
import { Themes } from './misc/themes';
import { Codes } from './codes';
import { stripAnsi } from '../utils/console';

export class KordJSChalk {
    private styles: StyleKey[];

    public constructor(styles: StyleKey[] = []) {
        this.styles = styles;
    }

    public format(text: string): string {
        return `${this.styles.join('')}${text}${Codes.reset}`;
    }

    public call = (text: string) => this.format(text);

    public static create(styles: StyleKey[] = []): Chain {
        const builder = new KordJSChalk(styles);

        const handler: ProxyHandler<object> = {
            get(_, prop: string) {
                if (prop in Codes) {
                    return KordJSChalk.create([...styles, Codes[prop as StyleKey as never]]);
                }

                if (prop === 'format') return builder.format.bind(builder);

                if (prop === 'call') return builder.call;

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
                }
            },

            apply(_, __, argArray) {
                const [text] = argArray;

                if (typeof text === 'string') return builder.call(text);

                throw new Error('text expects typeof string');
            }
        };
        
        return new Proxy(() => {}, handler) as unknown as Chain;
    }
}

export const colors: Chain = KordJSChalk.create();
