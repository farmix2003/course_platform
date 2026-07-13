import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CoursesPage from "./pages/CoursesPage";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/courses"
        element={<CoursesPage />}
      />

      <Route
        path="/courses/:id"
        element={<CourseDetailsPage />}
      />

      <Route path="/admin/courses" element={<AdminCoursesPage />} />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />
    </Routes>
  );
}
