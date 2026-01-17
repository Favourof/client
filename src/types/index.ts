// ============================================
// USER & AUTH TYPES
// ============================================

/**
 * user Object return from Backend
 */

export interface User {
  name: string;
  email: string;
  role: "user" | "admin";
  isverified: boolean;
  id: string;
}

/**
 * User credential for login
 */

export interface LoginCredentials {
  name: string;
  password: string;
}

/**
 * Credentail required for Register
 */
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

/**
 * Response from login/register endpoints
 */
export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

/**
 * Generic API success response
 */
export interface SuccessResponse {
  success: boolean;
  message: string;
}

/**
 * Generic API error response
 */
export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
}
