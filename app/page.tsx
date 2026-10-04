// src/app/page.tsx
import Header from "../layout/Header";
import Hero from "@/main/Hero";
import About from "@/main/About";
import CommunitySections from "@/main/CommunitySections";
import Gallery from "@/main/Gallery";
import Footer from "@/layout/Fotter";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <CommunitySections />
      <Gallery />
      <Footer />
    </>
  );
}