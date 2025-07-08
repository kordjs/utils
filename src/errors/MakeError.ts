// utils/src/errors/makeKordJSError.ts
import { MessageGenerator } from './ErrorRegistry';

/**
 * Factory to create stylized subclasses of native JavaScript error classes.
 *
 * @template T - Union of valid error code strings.
 * @template B - The native error constructor (e.g. Error, TypeError).
 *
 * @param BaseClass - The base error class to extend from.
 * @param name - A string used for the error class name.
 * @param messages - A map of error codes to message generator functions.
 * @param formatName - Optional function to format the error's name string.
 *
 * @returns A class extending the specified base error with custom formatting and typed codes.
 */
export function makeKordJSError<T extends string, B extends new (...args: unknown[]) => Error>(
    BaseClass: B,
    name: string,
    messages: MessageGenerator<T>,
    formatName?: (base: string, code: string) => string
) {
    //@ts-expect-error Required to bypass TS Mixin signature constraint.
    return class KordJSError extends BaseClass {
        public code: T;

        /**
         * Constructs a new instance of the custom error subclass.
         *
         * @param code - The error code used to determine the message.
         * @param args - Arguments passed to the message generator.
         */
        constructor(code: T, ...args: unknown[]) {
            const generator = messages[code];
            if (!generator) throw new Error(`No message associated with error code: ${code}`);
            const message = generator(...args);
            super(message);

            this.code = code;
            Object.setPrototypeOf(this, new.target.prototype);
            this.name = formatName ? formatName(name, code) : `${name} [${code}]`;

            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, new.target);
            }
        }

        /**
         * Converts the error to a serializable object.
         */
        toJSON() {
            return {
                name: this.name,
                code: this.code,
                message: this.message,
                stack: this.stack
            };
        }
    };
}
