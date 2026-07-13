import {
  ArrowForwardRounded,
} from "@mui/icons-material";
import {
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import { Link as RouterLink } from "react-router";
import { getCurrentUser } from "../../api/service";
export const CtaSection  = () => {
  if (getCurrentUser()) return null;

  return (
    
        <Container maxWidth="lg" sx={{ pb: 10 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 6,
              p: {
                xs: 4,
                md: 7,
              },
              textAlign: "center",
              color: "white",
              bgcolor: "#0f172a",
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.55), transparent 30%), radial-gradient(circle at 85% 80%, rgba(124,58,237,0.45), transparent 30%)",
            }}
          >
            <Typography
              variant="h3"
              fontWeight={900}
              sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
            >
              Ready to start learning?
            </Typography>

            <Typography
              sx={{
                mt: 2,
                mb: 4,
                color: "#cbd5e1",
                maxWidth: 620,
                mx: "auto",
              }}
            >
              Create an account, explore courses and begin building
              skills for your next opportunity.
            </Typography>

            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRounded />}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 800,
              }}
            >
              Create free account
            </Button>
          </Paper>
        </Container>
  )
}
