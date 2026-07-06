import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SyrupDivider from "@/components/SyrupDivider";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SyrupDivider />
      <About />
      <SyrupDivider flip />
      <Menu />
      <SyrupDivider />
      <Gallery />
      <SyrupDivider flip />
      <Contact />
      <Footer />
    </main>
  );
}
