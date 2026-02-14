"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/sections/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CompaniesSection from "@/components/sections/CompaniesSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

// Dynamic import for background to avoid SSR issues
const DynamicBackground = dynamic(
  () => import("@/components/DynamicBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#040810] text-white overflow-x-hidden">
      {/* Dynamic Animated Background */}
      <DynamicBackground />
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Companies Section */}
      <CompaniesSection />

      {/* Education Section */}
      <EducationSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
