import { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import SideNav from './components/SideNav';
import HeroSection from './components/HeroSection';
import Section1Apple from './components/Section1Apple';
import Section2NewtonQuestion from './components/Section2NewtonQuestion';
import Section3AppleToMoon from './components/Section3AppleToMoon';
import Section4Notebook from './components/Section4Notebook';
import Section5GravityExperiment from './components/Section5GravityExperiment';
import Section6MassExperiment from './components/Section6MassExperiment';
import Section7CosmicScale from './components/Section7CosmicScale';
import Section8Timeline from './components/Section8Timeline';
import Section9HistoricalNote from './components/Section9HistoricalNote';
import Section10Legacy from './components/Section10Legacy';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<string>('hero');

  // Section progress trackers (0 to 1)
  const [heroProgress, setHeroProgress] = useState<number>(0);
  const [appleProgress, setAppleProgress] = useState<number>(0);
  const [questionProgress, setQuestionProgress] = useState<number>(0);
  const [moonProgress, setMoonProgress] = useState<number>(0);
  const [notebookProgress, setNotebookProgress] = useState<number>(0);
  const [cosmicProgress, setCosmicProgress] = useState<number>(0);

  const tickingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const globalProgress = totalHeight > 0 ? Math.min(1, Math.max(0, currentScroll / totalHeight)) : 0;
          setScrollProgress(globalProgress);

          // Helper to calculate progress through a section element
          const getSectionProgress = (id: string): number => {
            const el = document.getElementById(id);
            if (!el) return 0;
            const rect = el.getBoundingClientRect();
            const elHeight = el.offsetHeight;
            const windowHeight = window.innerHeight;

            // Start when top of element hits top of window, end when bottom leaves
            const progress = (windowHeight - rect.top) / (elHeight + windowHeight * 0.5);
            return Math.min(1, Math.max(0, progress));
          };

          setHeroProgress(getSectionProgress('hero'));
          setAppleProgress(getSectionProgress('orchard'));
          setQuestionProgress(getSectionProgress('question'));
          setMoonProgress(getSectionProgress('moon'));
          setNotebookProgress(getSectionProgress('notebook'));
          setCosmicProgress(getSectionProgress('cosmic'));

          // Detect active section for navigation
          const sectionIds = [
            'hero',
            'orchard',
            'question',
            'moon',
            'notebook',
            'gravity-lab',
            'mass-lab',
            'cosmic',
            'timeline',
            'myth-note',
            'legacy',
          ];

          let active = 'hero';
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
                active = id;
              }
            }
          }
          setCurrentSection(active);

          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#F7F4EC] text-[#24211E] selection:bg-[#C59B27]/30 selection:text-[#1E1B18] overflow-x-hidden">
      {/* Top Navigation */}
      <Navigation
        currentSection={currentSection}
        scrollProgress={scrollProgress}
        onNavigate={scrollToSection}
      />

      {/* Side Navigation Dots on Desktop */}
      <SideNav
        currentSection={currentSection}
        onNavigate={scrollToSection}
      />

      {/* Main Narrative Sections Flow */}
      <main className="w-full">
        {/* Prologue: The Tree & Falling Apple Hero */}
        <HeroSection
          scrollProgress={heroProgress}
          onScrollDown={() => scrollToSection('orchard')}
        />

        {/* Section 1: The Orchard & The Apple */}
        <Section1Apple scrollProgress={appleProgress} />

        {/* Section 2: Newton's Question & Thought Leaps */}
        <Section2NewtonQuestion scrollProgress={questionProgress} />

        {/* Section 3: From Apple to Moon & Orbital Vectors */}
        <Section3AppleToMoon scrollProgress={moonProgress} />

        {/* Section 4: Newton's Notebook & Equation Unfolding */}
        <Section4Notebook scrollProgress={notebookProgress} />

        {/* Section 5: Interactive Gravity Lab (Distance & Inverse-Square) */}
        <Section5GravityExperiment />

        {/* Section 6: Interactive Mass Lab (Mutual Gravitational Pull) */}
        <Section6MassExperiment />

        {/* Section 7: The Cosmic Scale (Planets to Universe) */}
        <Section7CosmicScale scrollProgress={cosmicProgress} />

        {/* Section 8: Historical Timeline & Manuscript Cards */}
        <Section8Timeline />

        {/* Section 9: Curatorial Fact-Check (Did the apple hit his head?) */}
        <Section9HistoricalNote />

        {/* Section 10: Epilogue & The Cosmic Legacy */}
        <Section10Legacy onScrollToTop={scrollToTop} />
      </main>
    </div>
  );
}
