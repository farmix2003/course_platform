import {
  ArrowBackRounded,
  CheckCircleRounded,
  SchoolRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Link as RouterLink,
} from "react-router";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  alternativeText: string;
  alternativeLinkText: string;
  alternativeTo: string;
  children: ReactNode;
}

const features = [
  "Practical online courses",
  "Learn at your own pace",
  "Access from any device",
];

export default function AuthLayout({
  title,
  subtitle,
  alternativeText,
  alternativeLinkText,
  alternativeTo,
  children,
}: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            minHeight: { md: 680 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            borderRadius: 5,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              "0 24px 70px rgba(15, 23, 42, 0.10)",
          }}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              flexDirection: "column",
              justifyContent: "space-between",
              bgcolor: "#0f172a",
              color: "white",
              p: 7,
              position: "relative",
              overflow: "hidden",
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.65), transparent 32%), radial-gradient(circle at 85% 80%, rgba(124,58,237,0.45), transparent 35%)",
            }}
          >
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{
                color: "white",
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                }}
              >
                <SchoolRounded />
              </Avatar>

              <Typography
                variant="h6"
                fontWeight={900}
              >
                CourseHub
              </Typography>
            </Stack>

            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h3"
                fontWeight={900}
                lineHeight={1.1}
                mb={2}
              >
                Learn skills that build your future.
              </Typography>

              <Typography
                sx={{
                  color: "#cbd5e1",
                  lineHeight: 1.8,
                  mb: 5,
                  maxWidth: 470,
                }}
              >
                Join a modern learning platform focused on
                practical development skills and real-world
                projects.
              </Typography>

              <Stack spacing={2}>
                {features.map((feature) => (
                  <Stack
                    key={feature}
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                  >
                    <CheckCircleRounded
                      sx={{ color: "#60a5fa" }}
                    />

                    <Typography fontWeight={600}>
                      {feature}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "#94a3b8" }}
            >
              © 2026 CourseHub
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "background.paper",
              p: {
                xs: 3,
                sm: 6,
                md: 7,
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button
              component={RouterLink}
              to="/"
              startIcon={<ArrowBackRounded />}
              color="inherit"
              sx={{
                alignSelf: "flex-start",
                mb: 4,
                color: "text.secondary",
              }}
            >
              Back to home
            </Button>

            <Box sx={{ maxWidth: 460, width: "100%", mx: "auto" }}>
              <Typography
                component="h1"
                variant="h4"
                fontWeight={900}
                mb={1}
              >
                {title}
              </Typography>

              <Typography
                color="text.secondary"
                mb={4}
              >
                {subtitle}
              </Typography>

              {children}

              <Typography
                textAlign="center"
                color="text.secondary"
                mt={4}
              >
                {alternativeText}{" "}
                <Typography
                  component={RouterLink}
                  to={alternativeTo}
                  color="primary"
                  fontWeight={800}
                  sx={{ textDecoration: "none" }}
                >
                  {alternativeLinkText}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}