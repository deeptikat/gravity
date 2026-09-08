import { motion } from 'motion/react';
import { ArrowUp, Sparkles, BookOpen, Compass, Heart } from 'lucide-react';
import { playCelestialHum } from '../utils/audio';

interface Section10LegacyProps {
  onScrollToTop: () => void;
}

export default function Section10Legacy({ onScrollToTop }: Section10LegacyProps) {
  const handleRestart = () => {
    playCelestialHum();
    onScrollToTop();
  };

  return (
    <footer
      id="legacy"
      className="relative min-h-screen w-full bg-[#080910] text-[#F8F5EE] py-24 px-4 sm:px-8 cosmic-gradient border-t border-[#1C2235] overflow-hidden flex flex-col justify-between"
    >
      {/* Background Starfield & Subtle Gravitational Field Network */}
      <div className="absolute inset-0 space-star-field opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1C2541]/30 via-[#0B0E17]/60 to-[#040508] pointer-events-none" />

      {/* Subtle Luminous Gravitational Vectors connecting celestial nodes across screen */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <line x1="15%" y1="20%" x2="45%" y2="40%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="45%" y1="40%" x2="80%" y2="25%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="45%" y1="40%" x2="55%" y2="80%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="80%" y1="25%" x2="88%" y2="70%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4,4" />
        <circle cx="15%" cy="20%" r="3" fill="#D4AF37" />
        <circle cx="45%" cy="40%" r="4" fill="#D4AF37" />
        <circle cx="80%" cy="25%" r="3" fill="#D4AF37" />
        <circle cx="55%" cy="80%" r="3" fill="#D4AF37" />
        <circle cx="88%" cy="70%" r="2.5" fill="#D4AF37" />
      </svg>

      {/* Main Epilogue Stage */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto px-4">
        {/* Apple icon to universe continuum indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-serif uppercase tracking-widest text-[#D4AF37] mb-6 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Epilogue • The Eternal Thread</span>
        </motion.div>

        {/* Visual Continuity Chain: Apple -> Earth -> Moon -> Solar System -> Universe */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-6 text-xs sm:text-sm font-mono text-[#C5D0E8] bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#25304C]">
          <span className="flex items-center gap-1.5 text-red-400 font-bold">
            <span>🍎</span> Apple
          </span>
          <span className="text-[#D4AF37]">→</span>
          <span className="flex items-center gap-1.5 text-blue-400">
            <span>🌍</span> Earth
          </span>
          <span className="text-[#D4AF37]">→</span>
          <span className="flex items-center gap-1.5 text-gray-300">
            <span>🌕</span> Moon
          </span>
          <span className="text-[#D4AF37]">→</span>
          <span className="flex items-center gap-1.5 text-amber-300">
            <span>🪐</span> Solar System
          </span>
          <span className="text-[#D4AF37]">→</span>
          <span className="flex items-center gap-1.5 text-purple-300">
            <span>🌌</span> Universe
          </span>
        </div>

        {/* Climax Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-4 max-w-3xl"
        >
          <p className="font-serif text-xl sm:text-3xl md:text-4xl text-[#D8E2F5] font-light italic leading-relaxed">
            “Gravity was always there.”
          </p>

          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FFFFFF] font-medium leading-relaxed">
            “Newton gave us a way to understand it.”
          </p>

          <h2 className="pt-4 font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FDF8EE] via-[#E2C37A] to-[#B48325] leading-tight">
            ONE QUESTION CHANGED OUR VIEW OF THE UNIVERSE.
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#9AA8C7] max-w-2xl mx-auto pt-2 leading-relaxed">
            In asking why an ordinary fruit fell towards the sod, Sir Isaac Newton unveiled a singular geometric law that binds every stone, ocean, planet, and distant galaxy together in an eternal cosmic dance.
          </p>
        </motion.div>

        {/* Primary Action Button: "Explore Gravity Again" */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <button
            onClick={handleRestart}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C59B27] via-[#D4AF37] to-[#99701A] text-[#0C0F1A] font-heading font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            <span>Explore Gravity Again</span>
          </button>
        </motion.div>
      </div>

      {/* Curatorial Museum Exhibition Footer */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-16 border-t border-[#1F273D] mt-16 text-xs text-[#7B8BAE] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-serif font-bold">
            🍎
          </div>
          <div>
            <p className="font-heading font-bold text-white text-xs uppercase tracking-wider">
              An Interactive Storybook Museum Exhibition
            </p>
            <p className="font-serif italic text-[11px] text-[#A3B0CC]">
              Sir Isaac Newton & Universal Gravitation (1642–1727)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-serif text-[11px]">
          <span>Source: Philosophiae Naturalis Principia Mathematica (1687)</span>
          <span>•</span>
          <span>William Stukeley’s Memoirs (1752)</span>
          <span>•</span>
          <span>Woolsthorpe Manor, National Trust UK</span>
        </div>
      </div>
    </footer>
  );
}
