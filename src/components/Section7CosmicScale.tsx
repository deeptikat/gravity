import { motion } from 'motion/react';
import { Sparkles, Globe, Orbit, Compass } from 'lucide-react';

interface Section7CosmicScaleProps {
  scrollProgress: number; // 0 to 1
}

export default function Section7CosmicScale({ scrollProgress }: Section7CosmicScaleProps) {
  // Cosmic Zoom calculation:
  // 0.0 -> 0.2: Stage 1 - The Apple on Earth (Human Scale 10^-1 m)
  // 0.2 -> 0.4: Stage 2 - Earth & Moon (Planetary Scale 10^8 m)
  // 0.4 -> 0.65: Stage 3 - Inner & Outer Planets (Solar System Scale 10^12 m)
  // 0.65 -> 1.0: Stage 4 - Stars, Interstellar Gravitational Web & Galaxies (Cosmic Scale 10^21 m)

  const stageIndex = Math.min(3, Math.floor(scrollProgress * 4));

  // Reveal the whole thought early, then keep it readable while the cosmic scene evolves.
  const text1Opacity = Math.min(1, scrollProgress / 0.12);
  const text2Opacity = Math.min(1, scrollProgress / 0.16);
  const text3Opacity = Math.min(1, scrollProgress / 0.2);
  const text4Opacity = Math.min(1, scrollProgress / 0.24);

  // Zoom scale factor of the celestial canvas
  const zoomFactor = 1 + scrollProgress * 2.8;

  return (
    <section
      id="cosmic"
      className="relative min-h-[145vh] w-full bg-[#0B0D17] text-[#F8F5EE] overflow-hidden cosmic-gradient border-t border-[#1C2337]"
    >
      {/* Background Deep Space Starfield & Cosmic Nebula */}
      <div className="absolute inset-0 space-star-field opacity-90 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-purple-600/10 to-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Sticky Panoramic View */}
      <div className="sticky top-0 h-screen w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-between py-12 z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B48325]/20 border border-[#D4AF37]/40 text-xs font-serif uppercase tracking-widest text-[#D4AF37]">
            <span>Chapter VII</span>
            <span>•</span>
            <span>Universal Gravitation</span>
          </div>
          <h2 className="mt-2 font-heading text-2xl sm:text-4xl text-[#FFFFFF] font-bold">
            THE BIG IDEA: A SINGLE LAW FOR THE UNIVERSE
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#B0BDD9]">
            The barrier between the corruptible Earth and the immutable heavens shattered forever.
          </p>
        </div>

        {/* Dynamic Zooming Cosmic Stage */}
        <div className="relative w-full h-[380px] sm:h-[460px] my-auto flex items-center justify-center overflow-hidden">
          {/* Gravitational Lattice Web Lines (Spacetime Grid) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <defs>
              <radialGradient id="gridGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#2A3859" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50%" cy="50%" r="180" fill="url(#gridGlow)" />
            {/* Concentric gravitational equipotential rings */}
            {[60, 110, 160, 220, 290].map((r, i) => (
              <circle
                key={i}
                cx="50%"
                cy="50%"
                r={r}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.75"
                strokeDasharray="3,5"
                opacity={0.35 + i * 0.1}
              />
            ))}
          </svg>

          {/* Scale Indicator HUD Badge */}
          <div className="absolute top-4 left-4 sm:left-8 z-30 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-[#2D3956] text-xs font-mono text-[#D4AF37] flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            <span>
              Scale:{' '}
              {scrollProgress < 0.25
                ? 'Apple in Orchard (~0.1 m)'
                : scrollProgress < 0.5
                ? 'Earth & Moon (~4 × 10⁸ m)'
                : scrollProgress < 0.75
                ? 'Solar System (~1.5 × 10¹² m)'
                : 'Galactic Horizon (~10²¹ m)'}
            </span>
          </div>

          {/* Central Animated System Container */}
          <div
            className="relative flex items-center justify-center transition-transform duration-150"
            style={{ transform: `scale(${zoomFactor})` }}
          >
            {/* Central Star / Sun */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 shadow-[0_0_50px_rgba(251,191,36,0.8)] border border-amber-200 flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-white opacity-80" />
            </motion.div>

            {/* Orbiting Planets & Celestial Bodies */}

            {/* Orbit 1: Mercury */}
            <div className="absolute w-28 h-28 rounded-full border border-white/10 pointer-events-none animate-[spin_12s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A89886]" />
            </div>

            {/* Orbit 2: Venus */}
            <div className="absolute w-40 h-40 rounded-full border border-white/10 pointer-events-none animate-[spin_20s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#E5C382]" />
            </div>

            {/* Orbit 3: Earth & The Moon */}
            <div className="absolute w-56 h-56 rounded-full border border-[#D4AF37]/30 pointer-events-none animate-[spin_32s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
                {/* Earth */}
                <div className="w-4 h-4 rounded-full bg-[#2E7BB8] border border-blue-200 shadow-sm relative">
                  {/* Micro moon orbiting Earth */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white animate-spin" />
                </div>
              </div>
            </div>

            {/* Orbit 4: Mars */}
            <div className="absolute w-72 h-72 rounded-full border border-white/10 pointer-events-none animate-[spin_45s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C25134]" />
            </div>

            {/* Orbit 5: Jupiter & Galilean Moons */}
            <div className="absolute w-96 h-96 rounded-full border border-white/15 pointer-events-none animate-[spin_70s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-[#C99C6B] to-[#996D43] border border-amber-200/50 shadow-md flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white/70" />
              </div>
            </div>

            {/* Orbit 6: Saturn with Rings */}
            <div className="absolute w-[470px] h-[470px] rounded-full border border-white/10 pointer-events-none animate-[spin_100s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#E3D1A5] relative flex items-center justify-center">
                  {/* Saturn Rings */}
                  <div className="w-8 h-2 rounded-full border border-[#D1B882] -rotate-12 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Progressive Epiphanies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 z-20">
          <div
            style={{ opacity: text2Opacity }}
            className="p-4 sm:p-5 rounded-xl bg-[#0E1321]/90 backdrop-blur-md border border-[#2B354F] shadow-lg transition-opacity duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-2 font-serif text-xs">
              ✦
            </div>
            <p className="font-serif text-base sm:text-lg text-white font-medium">
              “The same law applied everywhere.”
            </p>
            <p className="mt-1 text-xs text-[#A8B5D4]">
              Before Newton, humanity assumed Heaven and Earth followed two completely irreconcilable sets of physical rules.
            </p>
          </div>

          <div
            style={{ opacity: text3Opacity }}
            className="p-4 sm:p-5 rounded-xl bg-[#0E1321]/90 backdrop-blur-md border border-[#2B354F] shadow-lg transition-opacity duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-2 font-serif text-xs">
              ✦
            </div>
            <p className="font-serif text-base sm:text-lg text-white font-medium">
              “The force that pulls an apple toward Earth…”
            </p>
            <p className="mt-1 text-xs text-[#A8B5D4]">
              “…also keeps the Moon in perpetual orbit, binding the tides of our oceans to the sky.”
            </p>
          </div>

          <div
            style={{ opacity: text4Opacity }}
            className="p-4 sm:p-5 rounded-xl bg-[#182035]/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-xl transition-opacity duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0B0D17] flex items-center justify-center mb-2 font-serif text-xs font-bold">
              ✦
            </div>
            <p className="font-serif text-base sm:text-lg text-[#FDE68A] font-medium">
              “…and governs the motion of planets.”
            </p>
            <p className="mt-1 text-xs text-[#C5D2F0]">
              Every celestial orb in the cosmos dances to the exact same mathematical melody: <span className="font-mono text-[#FDE68A]">F = G(m₁m₂)/r²</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
