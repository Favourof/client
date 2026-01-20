import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import authService from "@/services/auth.service";
import { handleAxiosError } from "@/utils/errorHandler";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    token ? "verifying" : "error",
  );
  const [message, setMessage] = useState(
    token ? "" : "Verification token is missing",
  );

  const verifyEmail = useCallback(
    async (token: string) => {
      try {
        const response = await authService.verifyEmail({ token });
        setStatus("success");
        setMessage(response.message);
        toast.success("Email verified successfully!");

        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setStatus("error");
        setMessage("Verification failed. Token may be invalid or expired.");
        handleAxiosError(error, "Verification failed");
      }
    },
    [navigate],
  );

  useEffect(() => {
    if (!token) return;

    verifyEmail(token);
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Email Verification
          </CardTitle>
          <CardDescription className="text-center">
            {status === "verifying" && "Verifying your email address..."}
            {status === "success" && "Email verified successfully"}
            {status === "error" && "Verification failed"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {status === "verifying" && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {status === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                {message}
                <br />
                <span className="text-sm">Redirecting to login...</span>
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <>
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">
                  {message}
                </AlertDescription>
              </Alert>

              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline">
                  <Link to="/login">Go to Login</Link>
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Need a new verification link?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    Register again
                  </Link>
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
