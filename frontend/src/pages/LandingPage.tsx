
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import { BenefitsSection } from "../components/landing/BenefitsSection";
import FeaturedCoursesSection from "../components/landing/FeaturedCoursesSection";
import { CtaSection } from "../components/landing/CtaSection ";
import Footer from "../components/landing/Footer";
import { Box } from "@mui/material";

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
     <Navbar />
      <Box
        component="main"
        sx={{
          background:
            "radial-gradient(circle at 85% 20%, rgba(37,99,235,0.16), transparent 32%), radial-gradient(circle at 10% 50%, rgba(124,58,237,0.10), transparent 28%)",
        }}
      >
      <HeroSection />
      <BenefitsSection />
      <FeaturedCoursesSection />    
      <CtaSection />

      </Box>

    <Footer />
    </Box>
  );
}