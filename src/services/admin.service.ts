import type { User } from "@/types";
import api from "./api";
// import { User } from "../types";

interface UserStats {
  totalUsers: number;
  adminUsers: number;
  regularUsers: number;
  recentUsers: number;
}

interface UsersResponse {
  success: boolean;
  count: number;
  users: User[];
}

interface StatsResponse {
  success: boolean;
  stats: UserStats;
}

// interface UpdateRoleRequest {
//   role: "user" | "admin";
// }

class AdminService {
  // Get all users
  async getAllUsers(): Promise<User[]> {
    const { data } = await api.get<UsersResponse>("/admin/users");
    return data.users;
  }

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const { data } = await api.get(`/admin/users/${id}`);
    return data.user;
  }

  // Update user role
  async updateUserRole(id: string, role: "user" | "admin"): Promise<User> {
    const { data } = await api.put(`/admin/users/${id}/role`, { role });
    return data.user;
  }

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await api.delete(`/admin/users/${id}`);
  }

  // Get user statistics
  async getUserStats(): Promise<UserStats> {
    const { data } = await api.get<StatsResponse>("/admin/stats");
    return data.stats;
  }
}

export default new AdminService();
