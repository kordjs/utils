/**
 * Represents a valid error code string.
 */
export type ErrorCode = string;

/**
 * Represents a function that generates an error message from arguments.
 */
export type ErrorMessageGenerator = (...args: unknown[]) => string;
