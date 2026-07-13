export interface FeaturedCourse {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  students: number;
  price: number;
  color: string;
}

export interface Course {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  createdAt: string;
}

export interface CourseRequest {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}
