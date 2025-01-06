import { describe, expect, it } from 'vitest';
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

    expect(e.position).toBe('Senior Developer');
  });
});
