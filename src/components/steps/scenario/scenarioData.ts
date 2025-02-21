
import { type TestScenario } from "./types";

export const initialScenarios: TestScenario[] = [
  {
    id: "TS-001",
    title: "User Authentication",
    description: "Verify all aspects of user authentication system including standard login, alternative paths, and error conditions",
    requirementId: "REQ-001",
    priority: "high",
    flows: [
      {
        type: "primary",
        description: "Standard login authentication",
        subflows: [
          {
            name: "Main Flow",
            coverage: "Valid credentials authentication, Successful login process, Dashboard access verification",
            expectedResults: "User successfully logs in"
          }
        ]
      },
      {
        type: "alternate",
        description: "Valid business variations",
        subflows: [
          {
            name: "Remember Me Option",
            coverage: "Persistent login functionality",
            expectedResults: "Session persists"
          },
          {
            name: "Password Change",
            coverage: "Password update process",
            expectedResults: "Password successfully changed"
          }
        ]
      },
      {
        type: "negative",
        description: "Business error conditions",
        subflows: [
          {
            name: "Invalid Login",
            coverage: "Wrong credentials handling",
            expectedResults: "Access denied"
          },
          {
            name: "Account Lockout",
            coverage: "Multiple failed attempts",
            expectedResults: "Account locked"
          }
        ]
      },
      {
        type: "exception",
        description: "System/technical errors",
        subflows: [
          {
            name: "System Unavailable",
            coverage: "Database connection failure",
            expectedResults: "System error message"
          },
          {
            name: "Network Issues",
            coverage: "Connection timeout",
            expectedResults: "Network error message"
          }
        ]
      }
    ]
  },
  {
    id: "TS-002",
    title: "Password Reset",
    description: "Validate password reset functionality including email verification and security measures",
    requirementId: "REQ-002",
    priority: "high",
    flows: [
      {
        type: "primary",
        description: "Standard password reset flow",
        subflows: [
          {
            name: "Main Flow",
            coverage: "Password reset request, Email verification, New password setup",
            expectedResults: "Password successfully reset"
          }
        ]
      },
      {
        type: "alternate",
        description: "Alternative reset methods",
        subflows: [
          {
            name: "Security Questions",
            coverage: "Security question verification",
            expectedResults: "Access granted via security questions"
          }
        ]
      },
      {
        type: "negative",
        description: "Invalid reset attempts",
        subflows: [
          {
            name: "Invalid Token",
            coverage: "Expired/invalid reset token handling",
            expectedResults: "Reset denied with proper message"
          }
        ]
      }
    ]
  }
];
