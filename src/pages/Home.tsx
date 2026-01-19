import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">MERN Auth System</h1>
        <p className="text-gray-600 mb-8">Production-ready authentication</p>
        <div className="space-x-4">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
