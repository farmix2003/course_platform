
import axios, { AxiosError } from "axios";
import httpClient from "./httpClient";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserResponse,
} from "../types/auth";
import type { Course, CourseRequest } from "../types/course";

const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: Record<string, string>;
}

export async function loginUser(request: LoginRequest): Promise<LoginResponse> {
  const response = await httpClient.post<LoginResponse>("/auth/login", request);
  return response.data;
}

export async function registerUser(
  request: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await httpClient.post<RegisterResponse>(
    "/auth/register",
    request,
  );
  return response.data;
}

export function saveSession(token: string, user: UserResponse): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): UserResponse | null {
  const value = localStorage.getItem(USER_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as UserResponse;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function getCourses(): Promise<Course[]> {
  const response = await httpClient.get<Course[]>("/v1/courses");
  return response.data;
}

export async function getCourse(id: number): Promise<Course> {
  const response = await httpClient.get<Course>(`/v1/courses/${id}`);
  return response.data;
}

export async function createCourse(request: CourseRequest): Promise<Course> {
  const response = await httpClient.post<Course>("/v1/courses", request);
  return response.data;
}

export async function updateCourse(
  id: number,
  request: CourseRequest,
): Promise<Course> {
  const response = await httpClient.put<Course>(`/v1/courses/${id}`, request);
  return response.data;
}

export async function deleteCourse(id: number): Promise<void> {
  await httpClient.delete(`/v1/courses/${id}`);
}

export function getApiFieldErrors(error: unknown): Record<string, string> {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) return {};
  return error.response?.data?.fieldErrors ?? {};
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const response = (error as AxiosError<ApiErrorResponse>).response;
    if (!response) {
      return "Unable to connect to the server.";
    }

    if (response.data?.message) return response.data.message;
    if (response.status === 401) return "Your session has expired. Please log in again.";
    if (response.status === 403) return "You do not have permission to perform this action.";
    if (response.status >= 500) return "The server encountered an error. Please try again later.";
    return "Request failed. Please try again.";
  }

  return error instanceof Error ? error.message : "Something went wrong.";
}
