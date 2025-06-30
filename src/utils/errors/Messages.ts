'use strict';

import { Codes } from '../../console/codes';
import { ErrorCodes } from './ErrorCodes';

export const Messages = {
  // Generic Errors.
  [ErrorCodes.UnknownProperty]: (prop: unknown) =>
    `Unknown property: ${Codes.red}${Codes.bold}${prop}${Codes.reset}`,
  [ErrorCodes.NoTypeMatch]: (expected: string, got: string) =>
    `Expected a ${Codes.bold}${Codes.green}${expected}${Codes.reset} but got ${Codes.red}${Codes.bold}${got}${Codes.reset}`,
  [ErrorCodes.EmptyString]: `Empty string. Expected string to be ${Codes.bold}${Codes.underline}>= 1${Codes.reset}`,

  // Focused Errors.
  [ErrorCodes.IconNotFound]: (name: string) =>
    `Icon "${Codes.bold}${Codes.red}${name}${Codes.reset}" does not exist.`,
  [ErrorCodes.UnknownStyle]: (style: string, styles: string[]) =>
    `Unknown style: "${Codes.bold}${Codes.red}${style}${Codes.reset}" (styles: ${Codes.bold}${styles}${Codes.reset})`,
  [ErrorCodes.UnSupportedColorInput]: `Expected a single color input, Arrays are not supported. To use multitple colors chain "${Codes.bold}colors${Codes.reset}"`
};
