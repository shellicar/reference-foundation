Feature: Employee management rules

  Scenario: The CEO must be located in "America"
    Given an employee is located in "Australia"
    When updating their position to "CEO"
    Then an error should be raised with code "CEO_LOCATION_INVALID"

  Scenario: The CEO salary must be between 200,000 and 500,000
    Given an employee is located in "America"
    And their salary is 150000
    When updating their position to "CEO"
    Then an error should be raised with code "CEO_SALARY_INVALID"

  Scenario: Successfully updating an employee to "CEO" in "America" with valid salary
    Given an employee is located in "America"
    And their salary is 300000
    When updating their position to "CEO"
    Then their position should be updated to "CEO"
