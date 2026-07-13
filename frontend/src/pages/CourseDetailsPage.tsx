import { ArrowBackRounded, SchoolRounded } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Container, Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router";
import { getApiErrorMessage, getCourse, getCurrentUser } from "../api/service";
import AppNav from "../components/AppNav";

export default function CourseDetailsPage() {
  const id = Number(useParams().id);
  const user = getCurrentUser();
  const course = useQuery({ queryKey: ["course", id], queryFn: () => getCourse(id), enabled: Boolean(user) && Number.isInteger(id) && id > 0 });

  if (!user) return <Navigate to="/login" replace />;
  if (!Number.isInteger(id) || id < 1) return <Navigate to="/courses" replace />;

  return <><AppNav /><Container maxWidth="lg" sx={{ py: 6 }}>
    <Button component={Link} to="/courses" startIcon={<ArrowBackRounded />} sx={{ mb: 3 }}>All courses</Button>
    {course.isPending && <Box sx={{ textAlign: "center", py: 10 }}><CircularProgress /></Box>}
    {course.isError && <Alert severity="error" action={<Button color="inherit" onClick={() => course.refetch()}>Retry</Button>}>{getApiErrorMessage(course.error)}</Alert>}
    {course.data && <Paper elevation={0} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" }, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
      <Box sx={{ minHeight: 420, bgcolor: "#e0e7ff", backgroundImage: course.data.imageUrl ? `url(${course.data.imageUrl})` : "none", backgroundSize: "cover", backgroundPosition: "center", display: "grid", placeItems: "center" }}>
        {!course.data.imageUrl && <SchoolRounded sx={{ fontSize: 110, color: "primary.main" }} />}
      </Box>
      <Stack spacing={3} sx={{ p: { xs: 4, md: 6 }, justifyContent: "center" }}>
        <Typography component="h1" variant="h3" sx={{ fontWeight: 900 }}>{course.data.title}</Typography>
        <Typography color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.8 }}>{course.data.description || "No description has been added yet."}</Typography>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 900 }}>${Number(course.data.price).toFixed(2)}</Typography>
        <Button variant="contained" size="large">Enroll now</Button>
      </Stack>
    </Paper>}
  </Container></>;
}
