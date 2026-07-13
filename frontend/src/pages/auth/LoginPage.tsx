import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import { Navigate } from "react-router";
import { getCurrentUser } from "../../api/service";


export default function LoginPage() {
  if (getCurrentUser()) return <Navigate to="/courses" replace />;

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue learning."
      alternativeText="Don't have an account?"
      alternativeLinkText="Create account"
      alternativeTo="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
