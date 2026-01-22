import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, CheckCircle, XCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Here's your account overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Account Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Account Status
              </CardTitle>
              {user.isVerified ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.isVerified ? "Verified" : "Unverified"}
              </div>
              <p className="text-xs text-gray-500">
                {user.isVerified
                  ? "Your email is verified"
                  : "Please verify your email"}
              </p>
            </CardContent>
          </Card>

          {/* Role */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Role</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{user.role}</div>
              <p className="text-xs text-gray-500">Account type</p>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Email Address
              </CardTitle>
              <Mail className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold truncate">{user.email}</div>
              <p className="text-xs text-gray-500">Primary contact</p>
            </CardContent>
          </Card>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Account Information
            </CardTitle>
            <CardDescription>
              Your personal details and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Name
                </label>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Role
                </label>
                <div className="mt-1">
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Verification Status
                </label>
                <div className="mt-1">
                  <Badge variant={user.isVerified ? "default" : "destructive"}>
                    {user.isVerified ? "Verified" : "Not Verified"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Warning */}
        {!user.isVerified && (
          <Card className="mt-6 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">Action Required</CardTitle>
              <CardDescription className="text-yellow-700">
                Please verify your email address to access all features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-800">
                Check your inbox for a verification email. If you didn't receive
                it,{" "}
                <a
                  href="/resend-verification"
                  className="underline font-medium"
                >
                  click here to resend
                </a>
                .
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
