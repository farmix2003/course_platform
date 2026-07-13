import { SchoolRounded } from "@mui/icons-material"
import { Box, Container, Stack, Typography } from "@mui/material"

const Footer = () => {
  return (
        <Box
        component="footer"
        sx={{
          py: 4,
          bgcolor: "white",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <SchoolRounded color="primary" />
              <Typography fontWeight={800}>
                CourseHub
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary">
              © 2026 CourseHub. Online course platform.
            </Typography>
          </Stack>
        </Container>
      </Box>
  )
}

export default Footer
