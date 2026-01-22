import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Shield, Lock, Zap, CheckCircle } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-linear-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Production-Ready Authentication
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Built with MERN stack, TypeScript, and modern best practices.
              Secure, scalable, and ready for production.
            </p>
            <div className="flex justify-center space-x-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline">
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Secure Authentication"
              description="JWT-based auth with access and refresh tokens"
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-primary" />}
              title="Email Verification"
              description="Verify users before granting access"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-primary" />}
              title="Password Reset"
              description="Secure password recovery via email"
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-primary" />}
              title="Role-Based Access"
              description="Admin and user roles with permissions"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
