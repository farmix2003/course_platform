import { ArrowForwardRounded, CheckCircleRounded, PlayCircleOutlineRounded, StarRounded } from '@mui/icons-material'
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'

import { Link as RouterLink } from "react-router";

const Intro = () => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
              <Chip
                icon={<StarRounded />}
                label="Learn. Build. Grow."
                color="primary"
                variant="outlined"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  bgcolor: "rgba(255,255,255,0.7)",
                }}
              />

              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3.5rem",
                    md: "4.2rem",
                  },
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  fontWeight: 900,
                  color: "text.primary",
                  mb: 3,
                }}
              >
                Build skills that
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "primary.main",
                  }}
                >
                  shape your future.
                </Box>
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: 580,
                  lineHeight: 1.7,
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                Learn programming and modern technologies through
                structured online courses designed for practical results.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
              >
                <Button
                  component={RouterLink}
                  to="/courses"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRounded />}
                  disableElevation
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                  }}
                >
                  Explore courses
                </Button>

                <Button
                  component={RouterLink}
                  to="/register"
                  variant="outlined"
                  size="large"
                  startIcon={<PlayCircleOutlineRounded />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    bgcolor: "rgba(255,255,255,0.7)",
                  }}
                >
                  Start learning
                </Button>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.5, sm: 3 }}
                mt={5}
              >
                {[
                  "No hidden fees",
                  "Learn at your pace",
                  "Practical projects",
                ].map((text) => (
                  <Stack
                    key={text}
                    direction="row"
                    alignItems="center"
                    spacing={0.8}
                  >
                    <CheckCircleRounded
                      color="success"
                      fontSize="small"
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      {text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
  )
}

export default Intro
