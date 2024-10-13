import { equal } from 'node:assert/strict';
import { describe, it } from 'mocha';
import { EmployeeAggregate } from '../../../src/features/employee/EmployeeAggregate.js';

describe('EmployeeAggregate', () => {
  it('Can change position', () => {
    const e = new EmployeeAggregate({
      id: '1',
      location: 'Australia',
      position: 'Developer',
      salary: 150000,
    });
    e.changePosition('Senior Developer');

    equal(e.position, 'Senior Developer');
  });
});
