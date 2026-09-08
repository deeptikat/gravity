import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Info, BookOpen } from 'lucide-react';
import { playQuillScratch } from '../utils/audio';

interface Section4NotebookProps {
  scrollProgress: number; // 0 to 1
}

export default function Section4Notebook({ scrollProgress }: Section4NotebookProps) {
  const [activeComponent, setActiveComponent] = useState<string | null>('F');

  // Progressive equation revelations on scroll:
  // 0.0 -> 0.25: Notebook moves forward and opens
  // 0.2 -> 0.45: Proportionality F ∝ 1/r² appears
  // 0.4 -> 0.55: Step 1: Force F appears
  // 0.5 -> 0.65: Step 2: Numerator masses m₁ and m₂ appear
  // 0.6 -> 0.75: Step 3: Denominator r² appears
  // 0.7 -> 0.85: Step 4: Gravitational Constant G appears
  // 0.85 -> 1.0: Full equation complete with gold illuminations

  const notebookScale = 0.85 + Math.min(0.2, scrollProgress * 0.25);
  const showProportionality = scrollProgress > 0.15;
  const showF = scrollProgress > 0.35;
  const showMasses = scrollProgress > 0.48;
  const showRadius = scrollProgress > 0.62;
  const showG = scrollProgress > 0.74;
  const isComplete = scrollProgress > 0.82;

  const handleComponentClick = (comp: string) => {
    setActiveComponent(comp);
    playQuillScratch();
  };

  const explanations: Record<string, { title: string; subtitle: string; desc: string; historical: string }> = {
    F: {
      title: 'F — Gravitational Force',
      subtitle: 'The mutual pull between two bodies',
      desc: 'The magnitude of attraction exerted mutually along the straight line joining the centers of mass of two bodies.',
      historical: 'Newton established in the Principia that this force is strictly mutual: the apple pulls upward on the Earth with the exact same force that the Earth pulls on the apple!',
    },
    G: {
      title: 'G — Universal Gravitational Constant',
      subtitle: '6.674 × 10⁻¹¹ N·m²/kg²',
      desc: 'The fundamental constant that dictates the intrinsic strength of gravity across the entire cosmos.',
      historical: 'Newton could not measure G directly with 17th-century instruments. It was first measured in 1798 by Henry Cavendish in his famous experiment to "weigh the Earth".',
    },
    m: {
      title: 'm₁ & m₂ — The Interacting Masses',
      subtitle: 'Amount of matter in each object',
      desc: 'Gravitational attraction is directly proportional to the product of the two masses. Double one mass, and the attraction doubles.',
      historical: 'Newton’s second law linked inertial mass to gravitational mass, proving that all bodies in a vacuum accelerate downward at the identical rate regardless of mass.',
    },
    r: {
      title: 'r² — Inverse Square of Distance',
      subtitle: 'The geometric dilution of force',
      desc: 'As distance doubles, the gravitational pull drops to 1/4th. At triple the distance, it drops to 1/9th. Force spreads over the spherical area 4πr².',
      historical: 'Newton proved using calculus that a spherically symmetric mass attracts external bodies as if its entire mass were concentrated at a single central point.',
    },
  };

  return (
    <section
      id="notebook"
      className="relative min-h-[170vh] w-full bg-[#FAF6EE] text-[#24211E] overflow-hidden parchment-texture border-t border-[#E2D8C3]"
    >
      <div className="sticky top-0 h-screen w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-between py-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE4D0] border border-[#D5C7AD] text-xs font-serif uppercase tracking-widest text-[#8C6218]">
            <span>Chapter IV</span>
            <span>•</span>
            <span>The Mathematical Manuscript</span>
          </div>
          <h2 className="mt-2 font-heading text-2xl sm:text-4xl text-[#24211E] font-bold">
            NEWTON’S NOTEBOOK: THE LAW UNFOLDS
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#685C4F]">
            Woolsthorpe Manor, 1666 • Translating divine cosmos into geometry and numbers.
          </p>
        </div>

        {/* The Giant Antique Notebook Presentation */}
        <div
          className="relative w-full max-w-4xl mx-auto my-auto transition-transform duration-200"
          style={{ transform: `scale(${notebookScale})` }}
        >
          {/* Leather Book Spine & Edge Shadow */}
          <div className="relative rounded-2xl bg-[#52291B] p-2 sm:p-4 shadow-2xl border-2 border-[#381B12]">
            {/* Inner Parchment Folio Spread */}
            <div className="relative rounded-xl bg-[#FCFAF4] border border-[#DCD1BA] p-5 sm:p-10 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[380px] sm:min-h-[420px] overflow-hidden">
              {/* Notebook Faint Grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#dcd1ba_1px,transparent_1px)] bg-[size:100%_28px] opacity-25 pointer-events-none" />

              {/* Left Folio Page: The Intuition & Proportionality */}
              <div className="relative flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DFC9] pb-4 md:pb-0 md:pr-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-serif text-[#8C6218] border-b border-[#E8DFC9] pb-2">
                    <span className="font-bold tracking-widest">FOLIO 42</span>
                    <span className="italic">Anno Domini 1666</span>
                  </div>

                  <p className="mt-3 font-serif text-sm text-[#4E4336] italic leading-relaxed">
                    “The force of gravity from the Earth is found to decrease outwards as the squares of the distances from its centre...”
                  </p>

                  {/* Proportionality reveal */}
                  {showProportionality && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 rounded-xl bg-[#F6EFE0] border border-[#DFCFA8] text-center"
                    >
                      <p className="font-heading text-xs uppercase tracking-widest text-[#8C6218] mb-1">
                        The Inverse-Square Relationship
                      </p>
                      <div className="font-serif-display text-3xl sm:text-4xl text-[#24211E] font-bold flex items-center justify-center gap-3">
                        <span className="text-[#8C6218]">F</span>
                        <span className="text-[#A4947C]">∝</span>
                        <div className="inline-flex flex-col items-center">
                          <span className="border-b border-[#24211E] px-2 text-2xl">1</span>
                          <span className="text-2xl pt-0.5">r²</span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs font-serif italic text-[#70624E]">
                        Double the distance, and the gravity weakens fourfold.
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Hand-drawn ink diagram of spherical radiation */}
                <div className="mt-4 flex items-center justify-center p-2 rounded-lg bg-[#FAF4E6]/80 border border-[#E5DAC4]">
                  <svg viewBox="0 0 200 80" className="w-48 h-20 opacity-85">
                    {/* Center point */}
                    <circle cx="20" cy="40" r="4" fill="#B48325" />
                    {/* Radiating inverse square lines */}
                    <line x1="20" y1="40" x2="190" y2="10" stroke="#7A6854" strokeWidth="1" strokeDasharray="3,2" />
                    <line x1="20" y1="40" x2="190" y2="70" stroke="#7A6854" strokeWidth="1" strokeDasharray="3,2" />
                    {/* Distance markers */}
                    <rect x="70" y="30" width="8" height="20" fill="none" stroke="#24211E" strokeWidth="1.2" />
                    <rect x="120" y="20" width="16" height="40" fill="none" stroke="#24211E" strokeWidth="1.2" />
                    <rect x="170" y="10" width="24" height="60" fill="none" stroke="#8C6218" strokeWidth="1.5" />
                    <text x="74" y="65" fontSize="8" fontFamily="serif" fill="#7A6854">1r</text>
                    <text x="126" y="75" fontSize="8" fontFamily="serif" fill="#7A6854">2r</text>
                    <text x="178" y="80" fontSize="8" fontFamily="serif" fill="#8C6218">3r</text>
                  </svg>
                </div>
              </div>

              {/* Right Folio Page: The Universal Equation Assembly */}
              <div className="relative flex flex-col justify-between md:pl-6">
                <div>
                  <div className="flex items-center justify-between text-xs font-serif text-[#8C6218] border-b border-[#E8DFC9] pb-2">
                    <span className="font-bold tracking-widest">LEX GRAVITATIS</span>
                    <span className="italic">Philosophiæ Naturalis</span>
                  </div>

                  <p className="mt-2 text-xs font-sans text-[#70624E]">
                    Scroll slowly to watch Newton synthesize mass, distance, and universal proportionality into one supreme law:
                  </p>

                  {/* Progressive Equation Construction Stage */}
                  <div className="mt-6 p-5 sm:p-7 rounded-2xl bg-[#FAF4E6] border-2 border-[#D8C7A3] shadow-md flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 sm:gap-3 text-3xl sm:text-5xl font-serif-display font-bold select-none">
                      {/* F */}
                      <button
                        onClick={() => handleComponentClick('F')}
                        className={`p-1.5 rounded-lg transition-all ${
                          showF ? 'opacity-100 scale-100' : 'opacity-20 scale-90'
                        } ${
                          activeComponent === 'F'
                            ? 'bg-[#B48325]/20 text-[#8C6218] ring-2 ring-[#B48325]'
                            : 'text-[#24211E] hover:text-[#8C6218]'
                        }`}
                        title="Click to inspect Force F"
                      >
                        F
                      </button>

                      <span className={`text-[#7A6B56] ${showF ? 'opacity-100' : 'opacity-20'}`}>=</span>

                      {/* G */}
                      <button
                        onClick={() => handleComponentClick('G')}
                        className={`p-1.5 rounded-lg transition-all ${
                          showG ? 'opacity-100 scale-100 text-[#8C6218]' : 'opacity-20 scale-90 text-[#9E907B]'
                        } ${
                          activeComponent === 'G'
                            ? 'bg-[#B48325]/20 text-[#8C6218] ring-2 ring-[#B48325]'
                            : 'hover:text-[#8C6218]'
                        }`}
                        title="Click to inspect Constant G"
                      >
                        G
                      </button>

                      {/* Fraction: (m1 * m2) / r^2 */}
                      <div className="inline-flex flex-col items-center mx-1">
                        {/* Numerator: m1 * m2 */}
                        <button
                          onClick={() => handleComponentClick('m')}
                          className={`border-b-2 border-[#24211E] px-3 pb-1 transition-all ${
                            showMasses ? 'opacity-100 scale-100 text-[#24211E]' : 'opacity-20 scale-90'
                          } ${
                            activeComponent === 'm'
                              ? 'bg-[#B48325]/20 text-[#8C6218] ring-2 ring-[#B48325] rounded-t-lg'
                              : 'hover:text-[#8C6218]'
                          }`}
                          title="Click to inspect Masses m1 and m2"
                        >
                          <span className="text-2xl sm:text-4xl">m₁ m₂</span>
                        </button>

                        {/* Denominator: r^2 */}
                        <button
                          onClick={() => handleComponentClick('r')}
                          className={`pt-1 px-3 transition-all ${
                            showRadius ? 'opacity-100 scale-100 text-[#24211E]' : 'opacity-20 scale-90'
                          } ${
                            activeComponent === 'r'
                              ? 'bg-[#B48325]/20 text-[#8C6218] ring-2 ring-[#B48325] rounded-b-lg'
                              : 'hover:text-[#8C6218]'
                          }`}
                          title="Click to inspect Distance r"
                        >
                          <span className="text-2xl sm:text-4xl">r²</span>
                        </button>
                      </div>
                    </div>

                    {/* Step-by-Step progress pills */}
                    <div className="flex gap-2 mt-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${showF ? 'bg-[#8C6218] text-white' : 'bg-gray-200 text-gray-400'}`}>1. Force (F)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${showMasses ? 'bg-[#8C6218] text-white' : 'bg-gray-200 text-gray-400'}`}>2. Masses (m)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${showRadius ? 'bg-[#8C6218] text-white' : 'bg-gray-200 text-gray-400'}`}>3. Radius (r²)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${showG ? 'bg-[#8C6218] text-white' : 'bg-gray-200 text-gray-400'}`}>4. Constant (G)</span>
                    </div>

                    {isComplete && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#8C6218] font-serif italic"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>The Universal Formula is Complete</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Variable Selector Tabs */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {[
                    { key: 'F', label: 'F (Force)' },
                    { key: 'G', label: 'G (Constant)' },
                    { key: 'm', label: 'm₁, m₂ (Masses)' },
                    { key: 'r', label: 'r² (Distance)' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => handleComponentClick(tab.key)}
                      className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap font-medium transition-all ${
                        activeComponent === tab.key
                          ? 'bg-[#24211E] text-[#F8F5EE] shadow-xs'
                          : 'bg-[#EDE5D4] text-[#635544] hover:bg-[#E3D9C3]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Parameter Information Card */}
        {activeComponent && explanations[activeComponent] && (
          <div className="mt-3 p-4 sm:p-5 rounded-xl bg-[#FAF7F0] border border-[#D5C7AD] shadow-sm max-w-4xl mx-auto w-full z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#B48325]/15 text-[#8C6218] flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#24211E]">
                    {explanations[activeComponent].title}
                  </h4>
                  <p className="text-xs font-serif italic text-[#8C6218]">
                    {explanations[activeComponent].subtitle}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#4A4035] leading-relaxed">
                    {explanations[activeComponent].desc}
                  </p>
                  <p className="mt-1.5 text-xs text-[#7A6B56] bg-[#F2EBDB] p-2 rounded-lg border border-[#E0D4BD]">
                    <span className="font-semibold text-[#5A4E3D]">Historical Note:</span> {explanations[activeComponent].historical}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
