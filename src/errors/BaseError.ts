/**
 * A generic error class that includes a typed error code and structured output.
 *
 * @template T - The type of the error code string.
 */
export class BaseError<T extends string = string> extends Error {
    /**
     * The error code associated with the error.
     */
    readonly code: T;

    /**
     * Constructs a new BaseError.
     *
     * @param code - A unique string identifying the type of error.
     * @param message - Optional message to override the default error message.
     */
    constructor(code: T, message?: string) {
        super(message || code);
        this.code = code;
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, new.target);
        }
    }

    /**
     * Converts the error to a serializable object.
     *
     * @returns An object representing the error.
     */
    toJSON() {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            stack: this.stack
        };
    }
}
