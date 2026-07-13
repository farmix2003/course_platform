import { AdminPanelSettingsRounded, SchoolRounded } from "@mui/icons-material";
import { AppBar, Avatar, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { clearSession, getCurrentUser } from "../api/service";

export default function AppNav() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "white", color: "text.primary", borderBottom: "1px solid", borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Stack component={Link} to="/" direction="row" spacing={1} sx={{ alignItems: "center", color: "inherit", textDecoration: "none", flexGrow: 1 }}>
            <Avatar sx={{ bgcolor: "primary.main" }}><SchoolRounded /></Avatar>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>CourseHub</Typography>
          </Stack>
          <Button component={Link} to="/courses">Courses</Button>
          {user?.role === "ADMIN" && (
            <Button component={Link} to="/admin/courses" startIcon={<AdminPanelSettingsRounded />}>Admin</Button>
          )}
          {user ? (
            <Button color="inherit" onClick={() => { clearSession(); navigate("/login"); }}>Logout</Button>
          ) : (
            <Button variant="contained" component={Link} to="/login">Login</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
