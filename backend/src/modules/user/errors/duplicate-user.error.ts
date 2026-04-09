export class DuplicateUserError extends Error {
  constructor(message = 'Duplicate user detected') {
    super(message);
    this.name = 'DuplicateUserError';
  }
}
