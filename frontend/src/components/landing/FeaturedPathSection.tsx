import { SchoolRounded } from '@mui/icons-material'
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const FeaturedPathSection = () => {
  return (
     <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 6,
                    p: {
                      xs: 2.5,
                      sm: 4,
                    },
                    bgcolor: "#0f172a",
                    color: "white",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow:
                      "0 30px 80px rgba(15, 23, 42, 0.24)",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: 220,
                      height: 220,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      filter: "blur(70px)",
                      opacity: 0.45,
                      right: -70,
                      top: -70,
                    }}
                  />

                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={4}
                    >
                      <Box>
                        <Typography
                          variant="overline"
                          sx={{ color: "#93c5fd" }}
                        >
                          Featured path
                        </Typography>

                        <Typography variant="h5" fontWeight={800}>
                          Full-stack developer
                        </Typography>
                      </Box>

                      <Avatar
                        sx={{
                          bgcolor: "rgba(255,255,255,0.12)",
                        }}
                      >
                        <SchoolRounded />
                      </Avatar>
                    </Stack>

                    {[
                      {
                        number: "01",
                        title: "Frontend foundations",
                        subtitle: "React and TypeScript",
                      },
                      {
                        number: "02",
                        title: "Backend development",
                        subtitle: "Spring Boot and REST APIs",
                      },
                      {
                        number: "03",
                        title: "Database and deployment",
                        subtitle: "PostgreSQL and Docker",
                      },
                    ].map((item) => (
                      <Paper
                        key={item.number}
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 1.5,
                          borderRadius: 3,
                          bgcolor: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                        >
                          <Avatar
                            sx={{
                              width: 42,
                              height: 42,
                              bgcolor: "primary.main",
                              fontSize: 14,
                              fontWeight: 800,
                            }}
                          >
                            {item.number}
                          </Avatar>

                          <Box>
                            <Typography fontWeight={700}>
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#cbd5e1" }}
                            >
                              {item.subtitle}
                            </Typography>
                          </Box>
                        </Stack>
                      </Paper>
                    ))}
                  </Box>
                </Paper>
  )
}

export default FeaturedPathSection
