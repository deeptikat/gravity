import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, HelpCircle, Flame } from 'lucide-react';
import { playQuillScratch, playPageTurn } from '../utils/audio';

interface Section2NewtonQuestionProps {
  scrollProgress: number; // 0 to 1
}

export default function Section2NewtonQuestion({ scrollProgress }: Section2NewtonQuestionProps) {
  const [interacted, setInteracted] = useState(false);

  // Scroll phase calculations
  // 0.0 -> 0.3: Newton sitting, candle flame flickering, gazing at apple
  // 0.2 -> 0.6: Book opens, pages turn, quill moves across paper
  // 0.4 -> 0.8: Newton turns gaze upward, thought arcs & handwritten queries form
  // 0.6 -> 1.0: Climax questions reveal

  const bookOpenProgress = Math.min(1, Math.max(0, (scrollProgress - 0.15) / 0.4));
  const quillMoveX = Math.sin(scrollProgress * Math.PI * 4) * 18;
  const quillMoveY = Math.cos(scrollProgress * Math.PI * 4) * 10;

  // Newton head tilt angle from looking down at apple (0°) to looking up at the sky (30°)
  const headAngle = Math.min(28, Math.max(0, (scrollProgress - 0.12) * 60));
  const appleDeskArrival = Math.min(1, scrollProgress / 0.28);

  const thoughtOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.18) / 0.22));
  const question2Opacity = Math.min(1, Math.max(0, (scrollProgress - 0.42) / 0.22));

  const triggerSound = () => {
    if (!interacted) {
      setInteracted(true);
      playPageTurn();
      setTimeout(playQuillScratch, 350);
    }
  };

  return (
    <section
      id="question"
      onMouseEnter={triggerSound}
      className="relative min-h-[125vh] w-full bg-[#EFE9DC] text-[#24211E] overflow-hidden parchment-texture border-t border-[#DED4C1]"
    >
      <div className="sticky top-0 h-screen w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-between py-14">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-4xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCcb] border border-[#CFBF9F] text-xs font-serif uppercase tracking-widest text-[#8C6218]">
              <span>Chapter II</span>
              <span className="text-[#C59B27]">•</span>
              <span>The Audacious Leap</span>
            </div>
            <h2 className="mt-2 font-heading text-2xl sm:text-4xl text-[#24211E] font-bold">
              ISAAC NEWTON’S QUESTION
            </h2>
            <p className="font-serif italic text-sm text-[#685C4F]">
              The young Newton watches the apple, then asks whether Earth’s pull reaches the Moon.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#8C6218] bg-[#FAF7F0]/80 px-3 py-1.5 rounded-lg border border-[#D5C9B3]">
            <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Candle burning • 23-year-old Isaac Newton</span>
          </div>
        </div>

        {/* The Newton's Table & Thinking Figure Scene */}
        <div className="relative w-full h-[400px] sm:h-[460px] my-auto flex items-center justify-center">
          <div className="absolute left-4 top-2 z-20 max-w-[220px] border-l-2 border-[#102A43] pl-3 pointer-events-none">
            <p className="font-heading text-[10px] tracking-[0.2em] text-[#102A43]">ISAAC NEWTON</p>
            <p className="mt-1 text-xs leading-relaxed text-[#486581]">A question becomes a universal law.</p>
          </div>
          {/* Historical Study Backdrop with window showing night sky */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Arched Window to nocturnal orchard & emerging Moon */}
            <div className="absolute top-4 right-10 sm:right-32 w-44 sm:w-56 h-64 rounded-t-full bg-[#111422] border-4 border-[#523B2A] overflow-hidden shadow-inner opacity-90">
              {/* Stars in window */}
              <div className="absolute inset-0 space-star-field opacity-70" />
              {/* Faint crescent Moon rising */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 left-10 w-12 h-12 rounded-full bg-[#FFF2C2] shadow-[0_0_16px_rgba(255,242,194,0.6)]"
              >
                <div className="absolute top-1 left-2 w-10 h-10 rounded-full bg-[#111422]" />
              </motion.div>
              {/* Window mullion grid */}
              <div className="absolute top-0 left-1/2 w-1 h-full bg-[#523B2A] -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 w-full h-1 bg-[#523B2A] -translate-y-1/2" />
            </div>

            {/* Glowing Candlelight aura on the table */}
            <div className="absolute left-[38%] bottom-32 w-52 h-52 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />
          </div>

          {/* Central Composite Illustration: Newton Character & Table */}
          <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
            <svg
              viewBox="0 0 640 400"
              className="w-full h-full drop-shadow-lg select-none"
            >
              <defs>
                <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2E243A" />
                  <stop offset="70%" stopColor="#1C1425" />
                  <stop offset="100%" stopColor="#100B17" />
                </linearGradient>
                <radialGradient id="candleFlame" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FFDC5E" />
                  <stop offset="85%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Scholar's Heavy Oak Table */}
              <path
                d="M 60 270 L 580 270 L 550 295 L 90 295 Z"
                fill="#4E3523"
              />
              {/* Table Legs */}
              <rect x="90" y="295" width="22" height="100" fill="#382415" rx="3" />
              <rect x="528" y="295" width="22" height="100" fill="#382415" rx="3" />
              <path d="M 112 340 L 528 340" stroke="#25170D" strokeWidth="6" />

              {/* Apple resting on desk near Newton */}
              <g transform={`translate(180, ${120 + appleDeskArrival * 120})`}>
                <ellipse cx="14" cy="24" rx="14" ry="4" fill="#291B10" opacity="0.4" />
                <circle cx="14" cy="16" r="12" fill="#D9281C" />
                <path d="M 14 5 C 16 1, 20 0, 22 0" stroke="#4B3322" strokeWidth="2" fill="none" />
                <ellipse cx="10" cy="12" rx="3" ry="5" fill="#FFFFFF" opacity="0.4" transform="rotate(-30 10 12)" />
              </g>

              {/* Tallow Candle in Pewter Candlestick */}
              <g transform="translate(230, 205)">
                {/* Stand */}
                <path d="M 8 60 L 32 60 L 26 50 L 14 50 Z" fill="#71757E" />
                <rect x="18" y="25" width="4" height="25" fill="#585B63" />
                {/* Wax Candle */}
                <rect x="16" y="8" width="8" height="24" fill="#F4EBD9" rx="1" />
                <line x1="20" y1="8" x2="20" y2="3" stroke="#24211E" strokeWidth="1.5" />
                {/* Flame with gentle oscillation */}
                <ellipse cx="20" cy="-2" rx="4" ry="8" fill="url(#candleFlame)">
                  <animate
                    attributeName="ry"
                    values="8;9.5;7.5;8"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="rx"
                    values="4;3.5;4.5;4"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </ellipse>
              </g>

              {/* Animated Interactive Notebook on Table */}
              <g transform="translate(280, 220)">
                {/* Underneath open book covers */}
                <path
                  d="M 10 45 Q 60 48, 110 45 Q 60 42, 10 45"
                  fill="#3D1A12"
                />
                {/* Left Page (Fixed) */}
                <path
                  d="M 10 45 C 30 38, 48 38, 60 44 L 60 14 C 48 8, 30 8, 10 14 Z"
                  fill="#FAF5EB"
                  stroke="#D3C5AB"
                  strokeWidth="0.8"
                />
                {/* Right Page with Dynamic Angle from scroll (Flips open) */}
                <g
                  transform={`translate(60, 44) rotate(${bookOpenProgress * -4}) translate(-60, -44)`}
                >
                  <path
                    d="M 60 44 C 72 38, 90 38, 110 45 L 110 14 C 90 8, 72 8, 60 14 Z"
                    fill="#F7F1DF"
                    stroke="#D3C5AB"
                    strokeWidth="0.8"
                  />
                  {/* Handwritten mathematical scribbles on right page */}
                  <path
                    d="M 66 18 Q 80 17, 98 18 M 66 23 Q 85 22, 102 23 M 66 28 Q 78 27, 92 28 M 66 33 Q 88 32, 100 33"
                    stroke="#504335"
                    strokeWidth="0.9"
                    strokeDasharray="2,2"
                  />
                </g>
              </g>

              {/* Quill moving across paper with scroll */}
              <g transform={`translate(${340 + quillMoveX}, ${205 + quillMoveY}) rotate(-35)`}>
                <path
                  d="M 0 35 C 4 18, 10 4, 12 0 C 11 8, 6 22, 0 35 Z"
                  fill="#ECE2CE"
                  stroke="#BEAF95"
                  strokeWidth="0.5"
                />
                <line x1="0" y1="42" x2="0" y2="0" stroke="#FAF5EB" strokeWidth="1.2" />
                <polygon points="-1,42 1,42 0,46" fill="#1E1B18" />
              </g>

              {/* Stylized Historical Figure: Isaac Newton Sitting */}
              <g transform="translate(380, 100)">
                {/* Chair backrest */}
                <rect x="75" y="60" width="14" height="160" fill="#2E1C12" rx="2" />
                <path d="M 70 50 L 95 50 L 95 65 L 70 65 Z" fill="#3D271B" />

                {/* Newton Coat Torso */}
                <path
                  d="M 10 150 
                     C 10 110, 30 90, 60 90 
                     C 85 90, 100 110, 100 160 
                     L 85 200 L 0 200 Z"
                  fill="url(#coatGrad)"
                />

                {/* White Linen Cravat / Neckcloth */}
                <path
                  d="M 45 88 L 65 88 L 68 115 L 42 115 Z"
                  fill="#FDFBF7"
                  stroke="#D3C9B8"
                  strokeWidth="0.6"
                />
                <path d="M 46 95 L 64 95 M 48 102 L 62 102" stroke="#B8AC99" strokeWidth="0.8" />

                {/* Arm resting toward desk & quill */}
                <path
                  d="M 35 110 C 10 125, -25 150, -40 160"
                  stroke="#1C1425"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                {/* Hand */}
                <ellipse cx="-45" cy="162" rx="7" ry="5" fill="#ECC8AF" />

                {/* Newton Head with dynamic tilt */}
                <g
                  transform={`translate(55, 60) rotate(${-headAngle})`}
                  style={{ transformOrigin: '20px 25px', transition: 'transform 0.2s ease-out' }}
                >
                  {/* Long shoulder-length wavy curls (characteristic of Newton's hair) */}
                  <path
                    d="M 0 5 
                       C -10 15, -15 35, -12 50 
                       C 5 50, 12 35, 15 25 
                       C 30 35, 45 40, 50 30 
                       C 55 10, 40 -10, 20 -10 
                       C 5 -10, 0 -2, 0 5 Z"
                    fill="#DCD3C3"
                    stroke="#B8AC97"
                    strokeWidth="1"
                  />
                  {/* Face profile */}
                  <path
                    d="M 8 10 
                       C 8 5, 14 0, 22 0 
                       C 30 0, 35 8, 35 18 
                       C 35 28, 28 35, 18 35 
                       C 12 35, 8 28, 8 18 Z"
                    fill="#F3D3BD"
                  />
                  {/* Prominent aquiline nose */}
                  <path d="M 28 14 L 33 20 L 29 23" fill="none" stroke="#DCA283" strokeWidth="1.2" />
                  {/* Eye gazing thoughtfully */}
                  <circle cx="25" cy="14" r="1.5" fill="#2C241E" />
                  {/* Eyebrow */}
                  <path d="M 22 10 Q 26 9, 29 11" stroke="#9A7B68" strokeWidth="1" fill="none" />
                </g>
              </g>

              {/* Dynamic Thought Arcs Linking Falling Apple to the Moon! */}
              {scrollProgress > 0.25 && (
                <g opacity={thoughtOpacity}>
                  <path
                    d="M 200 230 C 230 140, 340 70, 500 45"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    strokeDasharray="6,6"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;-24"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <circle cx="200" cy="230" r="4" fill="#D4AF37" />
                  <circle cx="500" cy="45" r="5" fill="#D4AF37" />
                </g>
              )}
            </svg>

            {/* Illuminated Thought Bubble / handwritten question pinned above */}
            {scrollProgress > 0.35 && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: thoughtOpacity, y: 0, scale: 1 }}
                className="absolute -top-4 sm:-top-8 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl bg-[#FAF7F0]/95 backdrop-blur-md border border-[#C59B27]/40 shadow-lg text-center max-w-md pointer-events-none"
              >
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#8C6218] font-bold">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  A Spark of Insight
                </span>
                <p className="mt-1 font-serif text-base sm:text-lg text-[#24211E] font-medium italic">
                  “Does the force that pulls the apple stop at the top of the tree?”
                </p>
                <p className="font-script text-lg text-[#8C6218]">
                  Does it reach the clouds? The mountain peaks? The Moon?
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Narrative Revelations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-2 z-10">
          <div
            style={{ opacity: thoughtOpacity }}
            className="p-4 sm:p-5 rounded-xl bg-[#FAF7F0]/95 backdrop-blur-xs border border-[#D5C9B3] shadow-xs transition-opacity duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-[#B48325]/15 flex items-center justify-center text-[#8C6218] mb-2 font-serif text-sm">
              I
            </div>
            <h3 className="font-heading text-xs uppercase tracking-widest text-[#8C6218] font-bold">
              The Extension of Force
            </h3>
            <p className="mt-1 font-serif text-lg sm:text-xl text-[#24211E] leading-snug">
              “Newton wondered whether the force pulling the apple toward Earth might reach much farther.”
            </p>
            <p className="mt-2 font-sans text-xs text-[#6B5E51] leading-relaxed">
              If an apple falls at the sea shore, and also falls on the highest peak of Mount Snowdon, why should the influence of Earth cease where the atmosphere thins into empty space?
            </p>
          </div>

          <div
            style={{ opacity: question2Opacity }}
            className="p-4 sm:p-5 rounded-xl bg-[#1E1B18] text-[#F8F5EE] border border-[#3E3832] shadow-md transition-opacity duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-2 font-serif text-sm">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="font-heading text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              The Cosmic Hypothesis
            </h3>
            <p className="mt-1 font-serif text-lg sm:text-xl text-[#FBF8F1] leading-snug">
              “What if the same force that pulls an apple down also holds the Moon in orbit?”
            </p>
            <p className="mt-2 font-sans text-xs text-[#C8BAA7] leading-relaxed">
              Prior thinkers believed celestial bodies and earthly stones belonged to two entirely different realms with different laws. Newton dared to propose one universal rule.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
