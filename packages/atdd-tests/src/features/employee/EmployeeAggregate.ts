import { DomainError } from './DomainError.js';

export type EmployeeState = {
  id: string;
  location: string;
  salary: number;
  position: string | null;
};

export class EmployeeAggregate {
  constructor(private state: EmployeeState) {}

  public get position() {
    return this.state.position;
  }

  changePosition(position: string) {
    if (position === 'CEO' && this.state.location !== 'America') {
      throw new DomainError('The CEO must be located in America', 'CEO_LOCATION_INVALID');
    }

    if (position === 'CEO' && (this.state.salary < 200000 || this.state.salary > 500000)) {
      throw new DomainError('The CEO salary must be between 200,000 and 500,000', 'CEO_SALARY_INVALID');
    }

    this.state.position = position;
  }
}
