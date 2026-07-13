import type { FeaturedCourse } from "../types/course";

export const featuredCourses: FeaturedCourse[] = [
  {
    id: 1,
    title: "Spring Boot Fundamentals",
    description:
      "Build secure REST APIs using Spring Boot, PostgreSQL and JWT.",
    level: "Beginner",
    duration: "12 hours",
    students: 1250,
    price: 49.99,
    color: "#2563eb",
  },
  {
    id: 2,
    title: "Modern React Development",
    description:
      "Create responsive frontend applications using React and TypeScript.",
    level: "Intermediate",
    duration: "16 hours",
    students: 980,
    price: 59.99,
    color: "#7c3aed",
  },
  {
    id: 3,
    title: "PostgreSQL Essentials",
    description:
      "Learn database design, relationships, queries and performance basics.",
    level: "Beginner",
    duration: "10 hours",
    students: 760,
    price: 39.99,
    color: "#0891b2",
  },
];

export const benefits = [
  {
    title: "Practical courses",
    description: "Learn through real projects and practical examples.",
  },
  {
    title: "Learn anytime",
    description: "Study at your own pace from any device.",
  },
  {
    title: "Quality content",
    description:
      "Structured lessons created for modern development skills.",
  },
];