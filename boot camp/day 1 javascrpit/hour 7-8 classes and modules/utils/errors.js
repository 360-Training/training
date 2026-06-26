export class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ValidationError";
  }
}

export class ConflictError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ConflictError";
  }
}