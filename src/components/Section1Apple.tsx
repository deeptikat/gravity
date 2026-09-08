import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, HelpCircle, Compass } from 'lucide-react';

interface Section1AppleProps {
  scrollProgress: number; // 0 to 1 through Section 1
}

export default function Section1Apple({ scrollProgress }: Section1AppleProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const appleRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      timeline
        .fromTo(appleRef.current, { xPercent: -50, y: 0, rotation: 0 }, { xPercent: -50, y: 350, rotation: 75, ease: 'power2.in' }, 0)
        .fromTo(sceneRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.14);
    }, sectionRef);

    return () => context.revert();
  }, []);

  // Progressive text opacity levels
  const text1Opacity = Math.min(1, Math.max(0, (scrollProgress - 0.12) / 0.2));
  const text2Opacity = Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.2));
  const text3Opacity = Math.min(1, Math.max(0, (scrollProgress - 0.48) / 0.2));

  return (
    <section
      ref={sectionRef}
      id="orchard"
      className="relative min-h-[125vh] w-full bg-[#F4EFE4] text-[#24211E] overflow-hidden parchment-texture border-t border-[#E5DCcb]"
    >
      {/* Sticky museum view container */}
      <div className="sticky top-0 h-screen w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-between py-16">
        {/* Section Chapter Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE5D4] border border-[#D5C9B3] text-xs font-serif uppercase tracking-widest text-[#8C6218]">
            <span>Chapter I</span>
            <span className="text-[#C59B27]">•</span>
            <span>The Ordinary Event</span>
          </div>
          <h2 className="mt-3 font-heading text-2xl sm:text-4xl text-[#24211E] font-bold">
            THE FALL IN THE ORCHARD
          </h2>
          <p className="mt-1 font-serif italic text-sm sm:text-base text-[#685C4F]">
            Autumn, 1666 • Woolsthorpe Manor Garden
          </p>
        </div>

        {/* The Illustrated Orchard Landscape Stage */}
        <div className="relative w-full h-[460px] sm:h-[520px] my-auto flex items-center justify-center">
          {/* Background Tree Foliage Silhouette */}
          <div className="absolute top-0 left-4 sm:left-16 w-80 h-64 pointer-events-none opacity-85">
            <svg viewBox="0 0 320 260" className="w-full h-full">
              <path
                d="M 20 0 Q 70 80, 110 140 Q 140 180, 160 260"
                fill="none"
                stroke="#433123"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M 110 140 Q 180 100, 260 90"
                fill="none"
                stroke="#433123"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx="90" cy="60" r="55" fill="#3D532E" opacity="0.9" />
              <circle cx="160" cy="45" r="65" fill="#4B6638" opacity="0.85" />
              <circle cx="230" cy="70" r="60" fill="#354927" opacity="0.9" />
            </svg>
          </div>

          {/* Foreground & Table/Bench Scene Elements (Emerges with scroll) */}
          <div
            ref={sceneRef}
            className="absolute inset-0 flex items-end justify-center"
          >
            {/* Wooden Garden Bench */}
            <div className="absolute left-[8%] sm:left-[18%] bottom-10 w-44 sm:w-60 h-28 pointer-events-none">
              <svg viewBox="0 0 240 120" className="w-full h-full filter drop-shadow-sm">
                {/* Bench legs */}
                <rect x="25" y="45" width="8" height="65" fill="#3E2B1E" rx="2" />
                <rect x="205" y="45" width="8" height="65" fill="#3E2B1E" rx="2" />
                {/* Bench slats */}
                <rect x="15" y="40" width="210" height="12" fill="#583E2C" rx="3" />
                <rect x="15" y="22" width="210" height="10" fill="#6B4D37" rx="2" />
                {/* Crossbrace */}
                <path d="M 25 80 L 210 80" stroke="#2D1F16" strokeWidth="4" />
              </svg>
            </div>

            {/* Scholar's Low Table with Book, Inks, Papers & Quill */}
            <div className="absolute right-[8%] sm:right-[18%] bottom-8 w-56 sm:w-72 h-40 pointer-events-none">
              <svg viewBox="0 0 280 160" className="w-full h-full filter drop-shadow-md">
                {/* Tabletop */}
                <path
                  d="M 20 80 L 260 80 L 240 100 L 40 100 Z"
                  fill="#4D3728"
                />
                <rect x="35" y="98" width="10" height="55" fill="#38261B" />
                <rect x="235" y="98" width="10" height="55" fill="#38261B" />

                {/* Scattered Parchment Papers */}
                <path
                  d="M 50 78 L 115 72 L 122 84 L 56 90 Z"
                  fill="#FDFBF7"
                  stroke="#D3C7B2"
                  strokeWidth="1"
                />
                <path
                  d="M 80 75 L 140 70 L 146 82 L 85 88 Z"
                  fill="#F7F1E1"
                  stroke="#C9BC9F"
                  strokeWidth="1"
                />
                {/* Ink scribbles on papers */}
                <path
                  d="M 60 80 Q 75 79, 90 80"
                  stroke="#5A4E40"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />
                <path
                  d="M 62 84 Q 85 83, 105 84"
                  stroke="#5A4E40"
                  strokeWidth="0.8"
                  strokeDasharray="3,1"
                />

                {/* Old Leather Bound Book (Open) */}
                <g transform="translate(135, 62)">
                  {/* Book cover spine */}
                  <path d="M 10 18 Q 35 15, 60 18 Q 35 21, 10 18" fill="#542517" />
                  {/* Left page */}
                  <path
                    d="M 12 17 C 22 8, 30 7, 34 16 L 34 22 C 30 14, 22 14, 12 21 Z"
                    fill="#F8F3E8"
                    stroke="#D9CEB9"
                    strokeWidth="0.5"
                  />
                  {/* Right page */}
                  <path
                    d="M 36 16 C 40 7, 50 8, 58 17 L 58 21 C 50 14, 40 14, 36 22 Z"
                    fill="#FAF5EC"
                    stroke="#D9CEB9"
                    strokeWidth="0.5"
                  />
                  {/* Bookmark ribbon */}
                  <path d="M 35 17 Q 37 26, 32 30" stroke="#8C1D18" strokeWidth="1.5" fill="none" />
                </g>

                {/* Glass Ink Bottle */}
                <g transform="translate(205, 64)">
                  <rect x="0" y="8" width="16" height="18" rx="2" fill="#1C1815" />
                  <rect x="4" y="3" width="8" height="5" rx="1" fill="#3D352E" />
                  <ellipse cx="8" cy="3" rx="4" ry="1.5" fill="#B48325" opacity="0.6" />
                  {/* Glass highlight */}
                  <rect x="2" y="10" width="2" height="14" fill="#FFFFFF" opacity="0.3" rx="1" />
                </g>

                {/* Goose Feather Quill Pen */}
                <g transform="translate(195, 48) rotate(-35)">
                  {/* Feather vane */}
                  <path
                    d="M 2 30 C 5 15, 12 2, 14 0 C 13 8, 8 20, 2 30 Z"
                    fill="#EDE5D4"
                    stroke="#C4B8A3"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M 2 30 C 0 18, -4 6, -2 0 C 0 10, 1 22, 2 30 Z"
                    fill="#E2D7C3"
                  />
                  {/* Shaft & nib */}
                  <line x1="2" y1="36" x2="2" y2="0" stroke="#F4EDE0" strokeWidth="1" />
                  <polygon points="1.5,36 2.5,36 2,40" fill="#24211E" />
                </g>
              </svg>
            </div>

            {/* Orchard Ground & Tufts of Grass */}
            <div className="w-full h-12 border-t border-[#D5CBB8] bg-gradient-to-b from-[#E7DFC9] to-[#DDD2B8] flex items-center justify-around px-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex gap-1 items-end opacity-75">
                  <span className="w-0.5 h-3.5 bg-[#4A643A] rounded-t-sm rotate-[-8deg]" />
                  <span className="w-0.5 h-5 bg-[#5D7C49] rounded-t-sm rotate-[4deg]" />
                  <span className="w-0.5 h-3 bg-[#425933] rounded-t-sm rotate-[12deg]" />
                </div>
              ))}
            </div>
          </div>

          {/* The Falling / Landed Apple */}
          <div
            ref={appleRef}
            className="absolute left-1/2 top-10 pointer-events-none"
          >
            {/* Apple drop trail */}
            {scrollProgress < 0.95 && (
              <div
                className="absolute left-1/2 -top-16 -translate-x-1/2 w-0.5 bg-gradient-to-t from-[#B48325]/60 to-transparent pointer-events-none"
                style={{ height: '70px' }}
              />
            )}

            {/* Apple SVG */}
            <div className="w-12 h-14 relative drop-shadow-md">
              <svg viewBox="0 0 44 48" className="w-full h-full">
                <defs>
                  <radialGradient id="sec1Apple" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FF7A60" />
                    <stop offset="30%" stopColor="#D9281C" />
                    <stop offset="85%" stopColor="#8A130C" />
                    <stop offset="100%" stopColor="#4A0804" />
                  </radialGradient>
                </defs>
                <path
                  d="M 22 14 C 23 7, 28 4, 30 2"
                  fill="none"
                  stroke="#442D1C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 22 9 C 26 6, 32 7, 33 11 C 29 12, 24 11, 22 9 Z"
                  fill="#5A783A"
                />
                <path
                  d="M 22 15 C 27 12, 40 14, 41 26 C 42 36, 30 46, 22 46 C 14 46, 2 36, 3 26 C 4 14, 17 12, 22 15 Z"
                  fill="url(#sec1Apple)"
                />
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
            </div>

            {/* Ground impact dust ripple upon landing */}
            {scrollProgress > 0.7 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full border border-[#B48325]/40 pointer-events-none"
              />
            )}
          </div>
        </div>

        {/* Progressive Scroll Narrative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4 z-10">
          {/* Statement 1 */}
          <div
            style={{ opacity: text1Opacity }}
            className="p-4 sm:p-5 rounded-xl bg-[#FAF7F0]/90 backdrop-blur-xs border border-[#DFD5C2] shadow-xs transition-opacity duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-[#B48325]/15 flex items-center justify-center text-[#8C6218] mb-2 font-serif text-sm">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="font-heading text-sm uppercase tracking-wider text-[#8C6218] font-bold">
              The Observation
            </h3>
            <p className="mt-1 font-serif text-lg sm:text-xl text-[#24211E] font-medium leading-snug">
              “Newton noticed something ordinary.”
            </p>
            <p className="mt-1 font-sans text-xs text-[#685C4F]">
              Thousands of fruits had fallen from trees across human history without anyone pausing to question why.
            </p>
          </div>

          {/* Statement 2 */}
          <div
            style={{ opacity: text2Opacity }}
            className="p-4 sm:p-5 rounded-xl bg-[#FAF7F0]/90 backdrop-blur-xs border border-[#DFD5C2] shadow-xs transition-opacity duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-[#B48325]/15 flex items-center justify-center text-[#8C6218] mb-2 font-serif text-sm">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-heading text-sm uppercase tracking-wider text-[#8C6218] font-bold">
              The Direct Path
            </h3>
            <p className="mt-1 font-serif text-lg sm:text-xl text-[#24211E] font-medium leading-snug">
              “An apple falls toward Earth.”
            </p>
            <p className="mt-1 font-sans text-xs text-[#685C4F]">
              It does not drift sideways with the wind. It travels on a line pointing precisely toward the center of our world.
            </p>
          </div>

          {/* Statement 3 */}
          <div
            style={{ opacity: text3Opacity }}
            className="p-4 sm:p-5 rounded-xl bg-[#24211E] text-[#F8F5EE] border border-[#3E3832] shadow-md transition-opacity duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-2 font-serif text-sm">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="font-heading text-sm uppercase tracking-wider text-[#D4AF37] font-bold">
              The Spark
            </h3>
            <p className="mt-1 font-serif text-lg sm:text-xl text-[#FAF5EB] font-medium leading-snug">
              “But why?”
            </p>
            <p className="mt-1 font-sans text-xs text-[#C8BAA7]">
              Why must matter seek matter? What draws an object to the ground if no invisible hand is pushing it?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
