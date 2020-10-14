/* eslint-disable max-classes-per-file */

// Base class for custom application errors.
// It extends Error.
export class CustomError extends Error {}

export class NotAuthorized extends CustomError {
  constructor(customMessage) {
    super();

    this.name = this.constructor.name;
    this.httpCode = 401;
    this.message = customMessage || 'Not authorized.';
  }
}

export class BadRequest extends CustomError {
  constructor(customMessage) {
    super();

    this.name = this.constructor.name;
    this.httpCode = 400;
    this.message = customMessage || 'Bad request.';
  }
}

export class ValidationError extends BadRequest {
  constructor(errors) {
    super();

    this.name = 'BadRequest';
    this.message = 'Invalid request parameters.';
    this.errors = errors;
  }
}

export class NotFound extends CustomError {
  constructor(customMessage) {
    super();

    this.name = this.constructor.name;
    this.httpCode = 404;
    this.message = customMessage || 'Not found.';
  }
}

export class InternalServerError extends CustomError {
  constructor(customMessage) {
    super();

    this.name = this.constructor.name;
    this.httpCode = 500;
    this.message = customMessage || 'An unexpected error occurred.';
  }
}
