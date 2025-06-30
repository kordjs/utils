'use strict';

/**
 * @typedef {Object} KordJSErrorCodes
 */
const keys = [
  // Generic Errors.
  'UnknownProperty',
  'NoTypeMatch',
  'EmptyString',

  // Focused Errors.
  'IconNotFound',
  'UnknownStyle',
  'UnSupportedColorInput'
];

/**
 * @type {KordJSErrorCodes}
 */
export const ErrorCodes = Object.fromEntries(keys.map((key) => [key, key]));
