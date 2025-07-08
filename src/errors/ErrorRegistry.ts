import { BaseError } from './BaseError';

/**
 * Maps error codes to message generator functions.
 */
export type MessageGenerator<T extends string> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in T]: (...args: any[]) => string;
};

/**
 * A simple registry for managing and generating typed BaseErrors.
 *
 * @template T - Union of valid error code strings.
 */
export class ErrorRegistry<T extends string> {
    constructor(private readonly messages: MessageGenerator<T>) {}

    /**
     * Creates a BaseError with a message derived from the code and arguments.
     *
     * @param code - The error code to look up.
     * @param args - Arguments to pass to the message generator function.
     * @returns A new instance of BaseError.
     */
    create(code: T, ...args: unknown[]): BaseError<T> {
        const generator = this.messages[code];
        const message = generator ? generator(...args) : code;
        return new BaseError(code, message);
    }
}
