import { EmployeeAggregate, type EmployeeState } from '../../../src/features/employee/EmployeeAggregate.js';

export class EmployeeBuilder {
  private id: string;
  private location = '';
  private salary = 0;
  private position = 'default';

  constructor(id: string) {
    this.id = id;
  }

  withLocation(location: string) {
    this.location = location;
    return this;
  }

  withSalary(salary: number) {
    this.salary = salary;
    return this;
  }

  withPosition(position: string) {
    this.position = position;
    return this;
  }

  build(): EmployeeAggregate {
    if (!this.position) {
      throw new Error('Position must be specified before building an employee.');
    }

    if (this.salary < 0) {
      throw new Error('Salary must be a positive number.');
    }

    if (!['Australia', 'America'].includes(this.location)) {
      throw new Error(`Invalid location: ${this.location}. Must be either "Australia" or "America".`);
    }

    const state: EmployeeState = {
      id: this.id,
      location: this.location,
      salary: this.salary,
      position: this.position, // Ensure the position is set
    };

    return new EmployeeAggregate(state);
  }
}
