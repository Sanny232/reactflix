class ServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

class InvalidRequestError extends ServerError {
  constructor(message = 'Invalid request') {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends ServerError {
  constructor(message = 'Not found') {
    super(message);
    this.status = 404;
  }
}

class UnauthorizedError extends ServerError {
  constructor(message = 'Unauthorized') {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ServerError,
  InvalidRequestError,
  UnauthorizedError,
  NotFoundError
};
