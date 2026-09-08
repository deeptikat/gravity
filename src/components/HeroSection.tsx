import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

function CursorAppleTrail({ enabled }: { enabled: boolean }) {
  const trailRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);

  useLayoutEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const trail = trailRef.current;
      const now = performance.now();
      if (!trail || !enabled || now - lastSpawnRef.current < 75) return;
      lastSpawnRef.current = now;

      const apple = document.createElement('span');
      apple.textContent = '🍎';
      apple.setAttribute('aria-hidden', 'true');
      apple.style.position = 'absolute';
      apple.style.left = '0';
      apple.style.top = '0';
      apple.style.fontSize = `${18 + Math.random() * 10}px`;
      apple.style.filter = 'drop-shadow(0 4px 5px rgba(16, 42, 67, 0.2))';
      trail.appendChild(apple);

      gsap.fromTo(
        apple,
        { x: event.clientX - 12, y: event.clientY - 12, scale: 0.35, opacity: 0, rotation: -12 },
        {
          x: event.clientX - 12 + (Math.random() * 24 - 12),
          y: event.clientY - 12 - 18,
          scale: 1,
          opacity: 1,
          rotation: Math.random() * 24 - 12,
          duration: 0.18,
          ease: 'back.out(2)',
          onComplete: () => {
            gsap.to(apple, {
              y: `+=${12 + Math.random() * 10}`,
              scale: 0.7,
              opacity: 0,
              duration: 0.65,
              delay: 0.18,
              ease: 'power2.in',
              onComplete: () => apple.remove(),
            });
          },
        },
      );
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [enabled]);

  return (
    <div ref={trailRef} className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" />
  );
}

interface HeroSectionProps {
  scrollProgress: number; // 0 to 1 through hero zone
  onScrollDown: () => void;
}

export default function HeroSection({ scrollProgress, onScrollDown }: HeroSectionProps) {

  // Progressive scroll-based variables:
  // 0 -> 0.4: Hero visible, apple swaying on branch
  // 0.25 -> 0.75: Apple detaches and accelerates downwards
  // 0.4 -> 0.8: Heading fades out
  // 0.65 -> 1.0: "Why did it fall down?" emerges
  const titleOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const cameraScale = 1 + scrollProgress * 0.45;
  const cameraTranslateY = scrollProgress * -80;

  // Apple drop calculation (acceleration via quadratic curve)
  const fallStart = 0.08;
  const fallProgress = Math.min(1, Math.max(0, (scrollProgress - fallStart) / 0.72));
  // Quadratic fall acceleration
  // Keep the full fall visible inside the illustrated stage.
  const appleDropY = fallProgress * fallProgress * 120;
  const appleRotation = fallProgress * 75;
  const isFallen = fallProgress > 0.05;

  return (
    <section
      id="hero"
      className="relative min-h-[125vh] w-full flex flex-col items-center justify-start pt-32 pb-20 overflow-hidden parchment-texture"
    >
      {/* Subtle historic archival background borders and watermark */}
      <div className="absolute inset-0 pointer-events-none border-[14px] border-[#EDE4D2]/60 mix-blend-multiply" />
      <div className="absolute top-12 left-12 text-[#102A43]/10 font-heading text-8xl select-none pointer-events-none hidden md:block">
        NEWTON / 1666
      </div>
      <CursorAppleTrail enabled={scrollProgress < 0.98} />

      {/* Hero Content Container with camera zoom transform */}
      <div
        className="sticky top-16 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center transition-transform duration-75"
        style={{
          transform: `scale(${cameraScale}) translateY(${cameraTranslateY}px)`,
          transformOrigin: '50% 60%',
        }}
      >
        {/* Curatorial Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity: titleOpacity }}
          className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5D4]/80 border border-[#D8CDBA] text-xs font-serif italic text-[#6B5E51] shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B48325]" />
          <span>Woolsthorpe Manor Orchard • Lincolnshire, England</span>
        </motion.div>

        {/* Primary Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ opacity: titleOpacity }}
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#24211E] max-w-4xl leading-[1.08]"
        >
          HOW NEWTON EXPLAINED <span className="text-[#8C6218] underline decoration-[#B48325]/30 underline-offset-8">GRAVITY</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          style={{ opacity: titleOpacity }}
          className="mt-4 font-serif text-lg sm:text-xl md:text-2xl text-[#5A5044] max-w-2xl font-light italic leading-relaxed"
        >
          “One apple. One question. One idea that changed our understanding of the universe.”
        </motion.p>

        {/* Interactive Tree & Apple Stage */}
        <div className="relative w-full max-w-lg h-80 sm:h-96 mt-6 flex items-center justify-center">
          {/* Stylized Historical Apple Tree SVG */}
          <svg
            viewBox="0 0 500 380"
            className="w-full h-full drop-shadow-md select-none pointer-events-none"
          >
            <defs>
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A3728" />
                <stop offset="50%" stopColor="#32241A" />
                <stop offset="100%" stopColor="#251B13" />
              </linearGradient>
              <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4B633C" />
                <stop offset="100%" stopColor="#2D4222" />
              </linearGradient>
              <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5E7B4B" />
                <stop offset="100%" stopColor="#384F2B" />
              </linearGradient>
              <radialGradient id="appleGlow" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FF7A60" />
                <stop offset="30%" stopColor="#D9281C" />
                <stop offset="85%" stopColor="#8A130C" />
                <stop offset="100%" stopColor="#4A0804" />
              </radialGradient>
            </defs>

            {/* Tree branches curving over */}
            <path
              d="M-20 380 C 60 260, 110 180, 180 140 C 230 110, 310 95, 420 120 C 470 130, 510 150, 540 180"
              fill="none"
              stroke="url(#trunkGrad)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M 180 140 C 220 90, 270 50, 350 45"
              fill="none"
              stroke="url(#trunkGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 270 102 C 260 145, 250 165, 250 190"
              fill="none"
              stroke="#3D2B1F"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Canopy Foliage Clusters */}
            <g opacity="0.95">
              <ellipse cx="140" cy="110" rx="75" ry="50" fill="url(#leafGrad1)" />
              <ellipse cx="230" cy="65" rx="90" ry="55" fill="url(#leafGrad2)" />
              <ellipse cx="330" cy="55" rx="85" ry="50" fill="url(#leafGrad1)" />
              <ellipse cx="420" cy="95" rx="80" ry="52" fill="url(#leafGrad2)" />
              <ellipse cx="260" cy="115" rx="70" ry="45" fill="url(#leafGrad1)" opacity="0.9" />
              {/* Decorative small leaves */}
              <path d="M 245 180 C 235 170, 230 185, 246 186 Z" fill="#6A8D56" />
              <path d="M 255 182 C 265 172, 270 187, 254 188 Z" fill="#4D6B3C" />
            </g>
          </svg>

          {/* The Apple Element */}
          <div
            className="absolute left-1/2 top-[150px] z-30 group pointer-events-none"
            style={{
              transform: `translate3d(-50%, ${appleDropY}px, 0) rotate(${appleRotation}deg)`,
              transition: isFallen ? 'none' : 'transform 0.2s ease-out',
            }}
          >
            {/* Apple Motion Trail when falling */}
            {fallProgress > 0.1 && (
              <div
                className="absolute left-1/2 -top-12 -translate-x-1/2 w-1.5 bg-gradient-to-t from-[#B48325]/50 to-transparent pointer-events-none"
                style={{ height: `${Math.min(80, appleDropY * 0.4)}px` }}
              />
            )}

            {/* Apple SVG Graphic */}
            <motion.div
              animate={
                !isFallen
                  ? { rotate: [-2, 2, -2] }
                  : {}
              }
              transition={
                { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
              }
              className="relative w-16 h-[70px] flex items-center justify-center filter drop-shadow-lg"
            >
              <svg viewBox="0 0 44 48" className="w-full h-full">
                {/* Stem */}
                <path
                  d="M 22 14 C 23 7, 28 4, 30 2"
                  fill="none"
                  stroke="#442D1C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Leaf */}
                <path
                  d="M 22 9 C 26 6, 32 7, 33 11 C 29 12, 24 11, 22 9 Z"
                  fill="#5A783A"
                />
                {/* Apple Body */}
                <path
                  d="M 22 15 
                     C 27 12, 40 14, 41 26 
                     C 42 36, 30 46, 22 46 
                     C 14 46, 2 36, 3 26 
                     C 4 14, 17 12, 22 15 Z"
                  fill="url(#appleGlow)"
                />
                {/* Highlight gleam */}
                <ellipse
                  cx="14"
                  cy="23"
                  rx="4.5"
                  ry="8"
                  transform="rotate(-25 14 23)"
                  fill="#FFFFFF"
                  opacity="0.32"
                />
              </svg>
            </motion.div>

          </div>

          {/* Reveal text: “Why did it fall down?” */}
          {scrollProgress > 0.45 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: Math.min(1, (scrollProgress - 0.45) * 2.5),
                scale: 1,
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none"
            >
              <p className="font-heading text-2xl sm:text-4xl text-[#342A21] tracking-wide font-medium">
                “Why did it fall down?”
              </p>
              <p className="mt-2 font-serif italic text-[#786958] text-sm sm:text-base">
                Why not sideways? Why not straight into the heavens?
              </p>
            </motion.div>
          )}
        </div>

        {/* Scroll invitation */}
        <div
          style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
          className="mt-6 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
          onClick={onScrollDown}
        >
          <span className="font-serif italic text-xs tracking-wider text-[#786B5A]">
            Scroll down to walk through Newton's thoughts
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full border border-[#C59B27]/40 flex items-center justify-center text-[#8C6218] bg-[#FAF7F0]/80 shadow-xs"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
