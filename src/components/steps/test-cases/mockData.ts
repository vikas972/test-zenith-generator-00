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
  },
  {
    id: "TC-002",
    title: "Verify Password Reset",
    scenarioId: "TS-002",
    requirementId: "REQ-002",
    priority: "high",
    description: "Verify user can successfully reset their password",
    preconditions: [
      "User account exists",
      "User has access to registered email",
      "User is not logged in"
    ],
    testData: [
      { field: "Email", value: "john.doe@example.com" },
      { field: "New Password", value: "NewPass@123" },
      { field: "Confirm Password", value: "NewPass@123" }
    ],
    testSteps: [
      {
        step: "Navigate to forgot password page",
        input: "Click 'Forgot Password' link",
        expected: "Password reset form displays"
      },
      {
        step: "Enter email address",
        input: "john.doe@example.com",
        expected: "Email field accepts input"
      },
      {
        step: "Submit reset request",
        input: "Click 'Reset Password' button",
        expected: "Success message shown"
      }
    ],
    expectedResults: [
      "Reset email sent to user",
      "Reset link works only once",
      "Password updated successfully"
    ],
    postconditions: [
      "Old password no longer works",
      "User can login with new password"
    ],
    status: "in_progress"
  },
  {
    id: "TC-003",
    title: "User Profile Update",
    scenarioId: "TS-003",
    requirementId: "REQ-003",
    priority: "medium",
    description: "Verify user can update their profile information",
    preconditions: [
      "User is logged in",
      "User has active session",
      "Profile page is accessible"
    ],
    testData: [
      { field: "Display Name", value: "John Doe Updated" },
      { field: "Phone", value: "+1-555-0123" },
      { field: "Address", value: "123 Main St" }
    ],
    testSteps: [
      {
        step: "Navigate to profile page",
        input: "Click profile icon",
        expected: "Profile page loads"
      },
      {
        step: "Update display name",
        input: "John Doe Updated",
        expected: "Field updates successfully"
      },
      {
        step: "Save changes",
        input: "Click 'Save' button",
        expected: "Success message displays"
      }
    ],
    expectedResults: [
      "Profile information updated",
      "Changes visible immediately",
      "Updated info persists after logout"
    ],
    postconditions: [
      "Audit log updated",
      "Email notification sent"
    ],
    status: "completed"
  },
  {
    id: "TC-004",
    title: "Account Deletion",
    scenarioId: "TS-001",
    requirementId: "REQ-001",
    priority: "high",
    description: "Verify user can delete their account",
    preconditions: [
      "User is logged in",
      "User has no pending transactions",
      "Account is in good standing"
    ],
    testData: [
      { field: "Password", value: "Current@123" },
      { field: "Confirmation", value: "DELETE" },
      { field: "Reason", value: "No longer needed" }
    ],
    testSteps: [
      {
        step: "Navigate to account settings",
        input: "Click 'Settings'",
        expected: "Settings page loads"
      },
      {
        step: "Select delete account",
        input: "Click 'Delete Account' button",
        expected: "Confirmation dialog shows"
      },
      {
        step: "Confirm deletion",
        input: "Enter confirmation text and password",
        expected: "Final warning displays"
      }
    ],
    expectedResults: [
      "Account marked for deletion",
      "User logged out",
      "Confirmation email sent"
    ],
    postconditions: [
      "Account data scheduled for deletion",
      "Recovery period initiated"
    ],
    status: "needs_review"
  },
  {
    id: "TC-005",
    title: "Two-Factor Authentication Setup",
    scenarioId: "TS-002",
    requirementId: "REQ-002",
    priority: "medium",
    description: "Verify user can enable and setup 2FA",
    preconditions: [
      "User is logged in",
      "2FA not previously enabled",
      "User has authenticator app"
    ],
    testData: [
      { field: "Current Password", value: "Valid@123" },
      { field: "2FA Code", value: "123456" },
      { field: "Backup Codes", value: "Generated" }
    ],
    testSteps: [
      {
        step: "Access security settings",
        input: "Navigate to security page",
        expected: "2FA options visible"
      },
      {
        step: "Enable 2FA",
        input: "Click 'Enable 2FA' button",
        expected: "QR code displays"
      },
      {
        step: "Verify setup",
        input: "Enter authentication code",
        expected: "2FA activated"
      }
    ],
    expectedResults: [
      "2FA successfully enabled",
      "Backup codes generated",
      "Security status updated"
    ],
    postconditions: [
      "2FA required for next login",
      "Backup codes stored securely"
    ],
    status: "completed"
  }
];
