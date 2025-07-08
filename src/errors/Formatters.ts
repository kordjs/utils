import { Codes } from '..';

/**
 * Register custom formatters.
 * When using makeKordJSError(1, 2, 3, formatter);
 * formatter expects a function that accepts "base" and "code"
 * "base" - the class name. In case, using a custom name,
 *   "base" will return the second argument given to makeKordJSError(1, name, 3, 4);
 *
 * "code" - the custom code throwed.
 *   codes can be registered in the third argument passed into makeKordJSError(1, 2, codes, 4);
 *
 * Formats an error name with ANSI styling for terminal output.
 *
 * @param base - The base class name (e.g. 'TypeError').
 * @param code - The custom error code (e.g. 'INVALID_INPUT').
 * @returns The formatted error name.
 */
export function styledErrorName(base: string, code: string): string {
    return `${Codes.bold}${Codes.yellow}${base} - [${code}]${Codes.reset}`;
}
