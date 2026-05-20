import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import ChatSection from '@/components/sections/ChatSection';
import Footer from '@/components/sections/Footer';
import FloatingChat from '@/components/FloatingChat';
import { ChatProvider } from '@/components/ChatContext';

export default function Home() {
  return (
    <ChatProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ChatSection />
      </main>
      <Footer />
      <FloatingChat />
    </ChatProvider>
  );
}
