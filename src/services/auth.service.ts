import type {
  AuthResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordRequest,
  SuccessResponse,
  User,
  VerifyEmailRequest,
} from "@/types";
import api from "./api";

class AuthService {
  // Register
  async register(
    credentials: RegisterCredentials,
  ): Promise<{ success: boolean; message: string; user: User }> {
    const { data } = await api.post("/auth/register", credentials);
    return data;
  }

  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post("/auth/login", credentials);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  }

  // Logout
  async logout(): Promise<SuccessResponse> {
    const { data } = await api.post("/auth/logout");
    localStorage.removeItem("token");
    return data;
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get("/auth/me");
    return data.user;
  }

  // Verify email
  async verifyEmail(request: VerifyEmailRequest): Promise<SuccessResponse> {
    const { data } = await api.post("/auth/verify-email", request);
    return data;
  }

  // Resend verification
  async resendVerification(email: string): Promise<SuccessResponse> {
    const { data } = await api.post("/auth/resend-verification", { email });
    return data;
  }

  // Forgot password
  async forgotPassword(
    request: ForgotPasswordRequest,
  ): Promise<SuccessResponse> {
    const { data } = await api.post("/auth/forgot-password", request);
    return data;
  }

  // Reset password
  async resetPassword(request: ResetPasswordRequest): Promise<SuccessResponse> {
    const { data } = await api.post("/auth/reset-password", request);
    return data;
  }

  // Change password
  async changePassword(
    request: ChangePasswordRequest,
  ): Promise<SuccessResponse> {
    const { data } = await api.post("/auth/change-password", request);
    return data;
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
}

export default new AuthService();
