/**
 * Export the utility function Codes.
 * @description ANSI Color Codes.
 */
export { Codes } from './console/codes';

/**
 * Export the variable colors
 * @description Used for chaining colors.red.*
 */
export { colors } from './console/builder';

/**
 * Export styling components
 * @description Components are special, different from colors -
 * Used for displaying a box / or any other styles in the terminal.
 */
export { box } from './console/styles/box';

/** Error Related exports. */
export { BaseError } from './errors/BaseError';
export { ErrorRegistry } from './errors/ErrorRegistry';
export { makeKordJSError } from './errors/MakeError';
export { styledErrorName } from './errors/Formatters';
