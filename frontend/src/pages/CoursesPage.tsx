import { ArrowForwardRounded, SchoolRounded } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router";
import { getApiErrorMessage, getCourses, getCurrentUser } from "../api/service";
import AppNav from "../components/AppNav";

export default function CoursesPage() {
  const user = getCurrentUser();
  const courses = useQuery({ queryKey: ["courses"], queryFn: getCourses, enabled: Boolean(user) });

  if (!user) return <Navigate to="/login" replace />;

  return <><AppNav /><Container maxWidth="lg" sx={{ py: 7 }}>
    <Typography component="h1" variant="h3" sx={{ fontWeight: 900, mb: 1 }}>Explore courses</Typography>
    <Typography color="text.secondary" sx={{ mb: 5 }}>Choose a course and start learning at your own pace.</Typography>
    {courses.isPending && <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}><CircularProgress /></Box>}
    {courses.isError && <Alert severity="error" action={<Button color="inherit" onClick={() => courses.refetch()}>Retry</Button>}>{getApiErrorMessage(courses.error)}</Alert>}
    {courses.data?.length === 0 && <Alert severity="info">No courses are available yet.</Alert>}
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3 }}>
      {courses.data?.map(course => <Card key={course.id} sx={{ display: "flex", flexDirection: "column", border: "1px solid", borderColor: "divider", boxShadow: "none", overflow: "hidden" }}>
        <Box sx={{ height: 180, bgcolor: "#e0e7ff", backgroundImage: course.imageUrl ? `url(${course.imageUrl})` : "none", backgroundSize: "cover", backgroundPosition: "center", display: "grid", placeItems: "center" }}>
          {!course.imageUrl && <SchoolRounded sx={{ fontSize: 64, color: "primary.main" }} />}
        </Box>
        <CardContent sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 850, mb: 1 }}>{course.title}</Typography>
          <Typography color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>{course.description || "Course details coming soon."}</Typography>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 900 }}>${Number(course.price).toFixed(2)}</Typography>
            <Button component={Link} to={`/courses/${course.id}`} endIcon={<ArrowForwardRounded />}>Details</Button>
          </Stack>
        </CardContent>
      </Card>)}
    </Box>
  </Container></>;
}
