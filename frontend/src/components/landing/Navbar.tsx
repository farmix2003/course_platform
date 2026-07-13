import { AdminPanelSettingsRounded, SchoolRounded } from '@mui/icons-material'
import { AppBar, Avatar, Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router'
import { clearSession, getCurrentUser } from '../../api/service'

const Navbar = () => {
  const user = getCurrentUser()
  const navigate = useNavigate()

  return (
    <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(248, 250, 252, 0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 72 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.2}
              component={RouterLink}
              to="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
                flexGrow: 1,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 42,
                  height: 42,
                }}
              >
                <SchoolRounded />
              </Avatar>

              <Typography
                variant="h6"
                fontWeight={800}
                color="text.primary"
              >
                CourseHub
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            >
              <Button
                color="inherit"
                component={RouterLink}
                to="/courses"
                sx={{ color: "text.primary" }}
              >
                Courses
              </Button>

              {user?.role === "ADMIN" && <Button component={RouterLink} to="/admin/courses" startIcon={<AdminPanelSettingsRounded />}>Admin</Button>}
              {user ? (
                <Button color="inherit" onClick={() => { clearSession(); navigate("/login") }}>Logout</Button>
              ) : <>
                <Button color="inherit" component={RouterLink} to="/login" sx={{ color: "text.primary" }}>Login</Button>
                <Button variant="contained" component={RouterLink} to="/register" disableElevation>Get started</Button>
              </>}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

  )
}

export default Navbar
