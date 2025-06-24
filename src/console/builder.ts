import type { CodeKey, Chain } from '../types';
import { box } from './styles';
import { Codes } from './codes';

export class KordJSChalk {
    private styles: string[];

    public constructor(styles: string[] = []) {
        this.styles = styles;
    }

    public format(text: string): string {
        return `${this.styles.join('')}${text}${Codes.reset}`;
    }

    public call = (text: string) => this.format(text);

    public static create(styles: string[] = []): Chain {
        const builder = new KordJSChalk(styles);

        const handler: ProxyHandler<object> = {
            get(_, prop: string) {
                if (prop in Codes) {
                    return KordJSChalk.create([...styles, Codes[prop as CodeKey]]);
                }

                if (prop === 'format') return builder.format.bind(builder);

                if (prop === 'call') return builder.call;

                if (prop === 'box') return (text: string) => box(KordJSChalk.create(styles)(text));

                return undefined;
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
