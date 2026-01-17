// ============================================
// USER & AUTH TYPES
// ============================================

/**
 * User object returned from backend
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isVerified: boolean;
}

/**
 * Credentials required for login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Credentials required for registration
 */
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

/**
 * Response from login/register endpoints
 * Contains access token and user data
 */
export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

/**
 * Generic success response (for operations that don't return data)
 * Used by: logout, verify-email, password-reset, etc.
 */
export interface SuccessResponse {
  success: boolean;
  message: string;
}

/**
 * Generic error response
 * Used when any API call fails
 */
export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
}

/**
 * Password reset request
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Password reset confirmation
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

/**
 * Change password request (when logged in)
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * Email verification request
 */
export interface VerifyEmailRequest {
  token: string;
}
