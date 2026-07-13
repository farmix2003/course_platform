import { PeopleAltRounded } from '@mui/icons-material'
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const LearnersPaper = () => {
  return (
     <Paper
                  elevation={0}
                  sx={{
                    position: {
                      xs: "static",
                      sm: "absolute",
                    },
                    mt: {
                      xs: 2,
                      sm: 0,
                      md:10
                    },
                    left: -80,
                    bottom: -10,
                    p: 2,
                    bgcolor:"rgba(255,255,255, 0.7)",
                    zIndex:100,
                    borderRadius: 3,
                    boxShadow: "0 18px 45px rgba(15,23,42,0.16)",
                  }}
                >
                  <Stack 
                   direction="row" spacing={1.5}>
                    <Avatar sx={{ bgcolor: "success.light" }}>
                      <PeopleAltRounded color="success" />
                    </Avatar>

                    <Box>
                      <Typography fontWeight={800}>
                        2,500+
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Active learners
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
  )
}

export default LearnersPaper
