import { ArrowForwardRounded, SchoolRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import type { Course } from "../../types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({
  course,
}: CourseCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        boxShadow: "none",
        border: "1px solid",
        borderColor: "divider",
        transition: "0.25s",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 20px 45px rgba(15,23,42,0.1)",
        },
      }}
    >
      <Box
        sx={{
          height: 170,
          bgcolor: "#e0e7ff",
          backgroundImage: course.imageUrl ? `url(${course.imageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 3,
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {!course.imageUrl && <SchoolRounded sx={{ fontSize: 58, color: "primary.main" }} />}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" fontWeight={800} mb={1.5}>
          {course.title}
        </Typography>

        <Typography color="text.secondary" mb={3}>
          {course.description || "Course details coming soon."}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          px: 3,
          pb: 3,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={900} color="primary">
          ${Number(course.price).toFixed(2)}
        </Typography>

        <Button
          component={RouterLink}
          to={`/courses/${course.id}`}
          endIcon={<ArrowForwardRounded />}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
