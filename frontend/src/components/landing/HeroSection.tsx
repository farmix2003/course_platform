import {
  Box,
  Container,
  Grid,
} from "@mui/material";
import LearnersPaper from "./LearnersPaper";
import FeaturedPathSection from "./FeaturedPathSection";
import Intro from "./Intro";

const HeroSection = () => {
  return (
    <Container maxWidth="lg">
          <Grid
            container
            spacing={{ xs: 6, md: 8 }}
            alignItems="center"
            sx={{
              minHeight: {
                xs: "auto",
                md: "calc(100vh - 72px)",
              },
              py: {
                xs: 8,
                md: 10,
              },
            }}
          >

         <Intro />

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  maxWidth: 520,
                  mx: "auto",
                }}
              >

               <FeaturedPathSection />
               <LearnersPaper />

              </Box>
            </Grid>
          </Grid>
        </Container>
  )
}

export default HeroSection
