export type DomainErrorCodes = 'CEO_LOCATION_INVALID' | 'CEO_SALARY_INVALID';

export class DomainError extends Error {
  code: DomainErrorCodes;

  constructor(message: string, code: DomainErrorCodes) {
    super(message);
    this.code = code;
  }
}
