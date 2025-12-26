import { Given, setWorldConstructor, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { EmployeeWorld } from './EmployeeWorld.js';

setWorldConstructor(EmployeeWorld);

Given('an employee is located in {string}', function (this: EmployeeWorld, location: string) {
  this.startBuildingEmployee('1');
  this.builder?.withLocation(location);
});

Given('their salary is {int}', function (this: EmployeeWorld, salary: number) {
  this.builder?.withSalary(salary);
});

When('updating their position to {string}', function (this: EmployeeWorld, position: string) {
  const employee = this.getEmployee('1');
  try {
    employee.changePosition(position);
  } catch (error) {
    this.setError(error);
  }
});

Then('an error should be raised with code {string}', function (this: EmployeeWorld, errorCode: string) {
  expect(this.error).to.not.be.null;
  expect(this.error).to.have.property('code', errorCode);
});

Then('their position should be updated to {string}', function (this: EmployeeWorld, position: string) {
  const employee = this.getEmployee('1');
  expect(employee.position).to.equal(position);
});
