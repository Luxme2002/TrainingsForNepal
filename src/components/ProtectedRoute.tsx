import { Navigate } from "react-router-dom";
import { useAuth, type AppRole } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Redirect to their correct dashboard
    const routes: Record<AppRole, string> = { student: "/student", trainer: "/trainer", admin: "/admin" };
    return <Navigate to={routes[role]} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
