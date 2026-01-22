import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, UserCog, TrendingUp, Shield } from "lucide-react";
import adminService from "@/services/admin.service";
import { handleAxiosError } from "@/utils/errorHandler";
import toast from "react-hot-toast";

interface UserStats {
  totalUsers: number;
  adminUsers: number;
  regularUsers: number;
  recentUsers: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await adminService.getUserStats();
      setStats(data);
    } catch (error) {
      handleAxiosError(error, "Failed to load statistics");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Shield className="h-8 w-8 mr-3 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage users and view system statistics
            </p>
          </div>
          <Button onClick={() => navigate("/admin/users")}>Manage Users</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-gray-500 mt-1">All registered users</p>
            </CardContent>
          </Card>

          {/* Admin Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Administrators
              </CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.adminUsers || 0}</div>
              <p className="text-xs text-gray-500 mt-1">Admin accounts</p>
            </CardContent>
          </Card>

          {/* Regular Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Regular Users
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.regularUsers || 0}
              </div>
              <p className="text-xs text-gray-500 mt-1">Standard accounts</p>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Sign-ups
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.recentUsers || 0}
              </div>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4"
              onClick={() => navigate("/admin/users")}
            >
              <div className="flex flex-col items-center">
                <UserCog className="h-6 w-6 mb-2" />
                <span>Manage Users</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4"
              onClick={() => toast("Feature coming soon!")}
            >
              <div className="flex flex-col items-center">
                <Users className="h-6 w-6 mb-2" />
                <span>View Activity</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4"
              onClick={() => toast("Feature coming soon!")}
            >
              <div className="flex flex-col items-center">
                <Shield className="h-6 w-6 mb-2" />
                <span>Security Settings</span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
