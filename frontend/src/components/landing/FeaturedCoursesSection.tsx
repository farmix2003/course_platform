import { ArrowForwardRounded } from "@mui/icons-material";
import {
  Box,
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getApiErrorMessage, getCourses } from "../../api/service";
import CourseCard from "./CourseCard";

export default function FeaturedCoursesSection() {
  const courses = useQuery({ queryKey: ["courses"], queryFn: getCourses });

  return (
    <Box sx={{ py: { xs: 8, md: 11 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "flex-end" }, mb: 5 }}
        >
          <Box>
            <Typography color="primary" sx={{ fontWeight: 800 }}>
              FEATURED COURSES
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "3rem" } }}
            >
              Start learning today
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/courses"
            endIcon={<ArrowForwardRounded />}
          >
            View all courses
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {courses.isPending && <Grid size={12}><Box sx={{ display: "flex", justifyContent: "center", py: 5 }}><CircularProgress /></Box></Grid>}
          {courses.isError && <Grid size={12}><Alert severity="error" action={<Button color="inherit" onClick={() => courses.refetch()}>Retry</Button>}>{getApiErrorMessage(courses.error)}</Alert></Grid>}
          {courses.data?.length === 0 && <Grid size={12}><Alert severity="info">No courses are available yet.</Alert></Grid>}
          {courses.data?.slice(0, 3).map((course) => (
            <Grid
              key={course.id}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
