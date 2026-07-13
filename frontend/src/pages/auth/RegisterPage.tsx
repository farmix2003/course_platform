import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "../../components/auth/RegistrationForm";
import { Navigate } from "react-router";
import { getCurrentUser } from "../../api/service";

export default function RegisterPage() {
  if (getCurrentUser()) return <Navigate to="/courses" replace />;

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start learning and building new skills today."
      alternativeText="Already have an account?"
      alternativeLinkText="Login"
      alternativeTo="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
