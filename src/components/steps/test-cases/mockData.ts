
import { TestCase } from "./types";

export const mockTestCases: TestCase[] = [
  {
    id: "TC-001",
    title: "Verify Successful Login",
    scenarioId: "TS-001",
    requirementId: "REQ-001",
    priority: "high",
    description: "Verify user can login with valid credentials",
    preconditions: [
      "User account exists",
      "User is not logged in",
      "System is accessible"
    ],
    testData: [
      { field: "Username", value: "john.doe@example.com" },
      { field: "Password", value: "Valid@123" },
      { field: "Remember Me", value: "Yes" }
    ],
    testSteps: [
      {
        step: "Navigate to login page",
        input: "https://app.com/login",
        expected: "Login form displays"
      },
      {
        step: "Enter username",
        input: "john.doe@example.com",
        expected: "Field accepts input"
      },
      {
        step: "Enter password",
        input: "Valid@123",
        expected: "Password masked"
      },
      {
        step: "Click login button",
        input: "Click action",
        expected: "Form submits"
      }
    ],
    expectedResults: [
      "User successfully logged in",
      "Dashboard displayed",
      "Username visible in header"
    ],
    postconditions: [
      "User session created",
      "Audit log updated"
    ],
    status: "completed"
  }
];
