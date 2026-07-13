import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { benefits } from "../../data/landingData";
export const BenefitsSection = () => {
  return (
    
      
      

<Box sx={{ bgcolor: "white", py: { xs: 8, md: 11 } }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={6}>
              <Typography
                color="primary"
                fontWeight={800}
                mb={1}
              >
                WHY COURSEHUB
              </Typography>

              <Typography
                variant="h3"
                fontWeight={900}
                sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
              >
                Everything you need to learn
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ maxWidth: 620, mx: "auto", mt: 2 }}
              >
                A simple learning experience focused on useful,
                career-ready skills.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {benefits.map((benefit) => (
                <Grid
                  key={benefit.title}
                  size={{ xs: 12, md: 4 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      height: "100%",
                      p: 4,
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "0.25s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow:
                          "0 20px 45px rgba(15,23,42,0.09)",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 54,
                        height: 54,
                        bgcolor: "primary.main",
                        mb: 3,
                      }}
                    >
                      {benefit.icon}
                    </Avatar>

                    <Typography
                      variant="h5"
                      fontWeight={800}
                      mb={1.5}
                    >
                      {benefit.title}
                    </Typography>

                    <Typography color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
)
}