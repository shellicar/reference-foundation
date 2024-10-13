import type { EmployeeAggregate } from '../../../src/features/employee/EmployeeAggregate.js';
import { EmployeeBuilder } from './EmployeeBuilder.js';

export class EmployeeWorld {
  employees: Map<string, EmployeeAggregate>;
  builder: EmployeeBuilder | null;
  error: Error | null;

  constructor() {
    this.employees = new Map();
    this.builder = null;
    this.error = null;
  }

  getEmployee(id: string): EmployeeAggregate {
    let employee = this.employees.get(id);
    if (!employee && this.builder) {
      employee = this.builder.build();
      this.employees.set(id, employee);
    }
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }
    return employee;
  }

  startBuildingEmployee(id: string) {
    this.builder = new EmployeeBuilder(id);
  }

  setError(error: unknown) {
    if (error instanceof Error) {
      this.error = error;
    } else {
      this.error = new Error(String(error));
    }
  }

  resetError() {
    this.error = null;
  }
}
