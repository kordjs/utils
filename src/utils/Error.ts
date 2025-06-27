/**
 * Interface for the constructor options of CustomError.
 */
export interface CustomErrorOptions {
  message: string;
  context?: Record<string, unknown>;
  errorCode?: string | number;
}

/**
 * A robust, extensible custom error class for modern TypeScript libraries and applications.
 *
 * It enhances the built-in `Error` class with support for:
 * - Custom error codes for programmatic error handling.
 * - A `context` object for attaching arbitrary data for better logging and debugging.
 * - A `log()` method for structured, "fancy" logging.
 * - A `toJSON()` method for clean serialization.
 */
export class CustomError extends Error {
  public readonly errorCode?: string | number;
  public readonly context?: Record<string, unknown>;

  /**
   * Creates an instance of CustomError.
   * @param {CustomErrorOptions | string} options - The error options or a simple error message string.
   */
  constructor(options: CustomErrorOptions | string) {
    // Allow for a simple string message
    const {
      message,
      errorCode,
      context,
    } = typeof options === 'string' ? { message: options } : options;

    // Call the parent Error constructor
    super(message);

    // Set the error name to the class name for easy identification
    this.name = this.constructor.name;

    // Assign custom properties
    this.errorCode = errorCode;
    this.context = context;

    // Capture the stack trace, excluding the constructor call.
    // This is a V8-specific feature (Node.js, Chrome) but is gracefully ignored
    // in other JavaScript environments.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Fix the prototype chain to ensure 'instanceof CustomError' works correctly.
    // This is a known issue when extending built-in classes in TypeScript.
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Performs structured logging of the error details.
   * In a real application, you would replace `console.error` with a proper logger
   * like Winston or Pino for features like log levels, transports, and formatting.
   */
  public log(): void {
    const logObject = {
      name: this.name,
      message: this.message,
      errorCode: this.errorCode,
      context: this.context,
      stack: this.stack,
    };

    // Using console.error for demonstration. A structured logger is recommended.
    console.error(JSON.stringify(logObject, null, 2));
  }

  /**
   * Provides a JSON-serializable representation of the error.
   * This is useful for consistent error serialization.
   * The stack trace is omitted by default in production for security reasons.
   *
   * @param {boolean} [includeStack=process.env.NODE_ENV !== 'production'] - Whether to include the stack trace.
   * @returns {Record<string, unknown>} A plain object representing the error.
   */
  public toJSON(includeStack?: boolean): Record<string, unknown> {
    // Default to hiding the stack in production environments for security.
    // This check is now safe for all JS environments (node, browser, etc.).
    const shouldIncludeStack =
      includeStack ??
      (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production');

    const jsonObject: Record<string, unknown> = {
      name: this.name,
      message: this.message,
    };

    if (this.errorCode) {
      jsonObject.errorCode = this.errorCode;
    }

    if (this.context) {
      jsonObject.context = this.context;
    }

    if (shouldIncludeStack && this.stack) {
      jsonObject.stack = this.stack;
    }

    return jsonObject;
  }
}

// --- Examples of more specific error types ---

/** Represents a user input validation error. */
export class ValidationError extends CustomError {
  constructor(message: string, context?: Record<string, unknown>) {
    super({ message, context, errorCode: 'VALIDATION_FAILED' });
    this.name = 'ValidationError';
  }
}

/** Represents an error originating from a database operation. */
export class DatabaseError extends CustomError {
  constructor(message: string, context?: Record<string, unknown>) {
    super({ message, context, errorCode: 'DB_UNAVAILABLE' });
    this.name = 'DatabaseError';
  }
}
