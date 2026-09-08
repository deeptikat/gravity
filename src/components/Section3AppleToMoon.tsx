import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Compass, ArrowDownRight, MoveRight, ArrowDown } from 'lucide-react';
import { playCelestialHum } from '../utils/audio';

interface Section3AppleToMoonProps {
  scrollProgress: number; // 0 to 1
}

export default function Section3AppleToMoon({ scrollProgress }: Section3AppleToMoonProps) {
  // Interactive Newton's Cannon Thought Experiment
  const [cannonVelocity, setCannonVelocity] = useState<number>(7.9); // km/s
  const [isFiring, setIsFiring] = useState<boolean>(false);

  // Scroll phase calculations
  // 0.0 -> 0.4: Zooming out from Newton/orchard to planetary Earth
  // 0.25 -> 0.7: Moon enters orbit around Earth, apple shrinks down to micro scale
  // 0.5 -> 0.9: Gravitational geodesic connection and vector diagram (Gravity down, Tangential right, Combined curve)
  // 0.7 -> 1.0: Climax quote & Cannon interactive demonstration

  const zoomProgress = Math.min(1, scrollProgress / 0.5);
  // Earth scale from 0.4 to 1.0
  const earthScale = 0.5 + zoomProgress * 0.5;

  // Moon orbit position based on continuous time + scroll offset
  const moonAngle = (scrollProgress * 4.5 * Math.PI) % (2 * Math.PI);
  const orbitRadius = 145;
  const moonX = Math.cos(moonAngle) * orbitRadius;
  const moonY = Math.sin(moonAngle) * orbitRadius * 0.45; // slight orbital inclination

  // Apple scale shrinking as we pull back into space
  const appleScale = Math.max(0.2, 1 - zoomProgress * 0.8);
  const appleOpacity = Math.max(0.4, 1 - zoomProgress * 0.5);

  const vectorsOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.4) / 0.3));
  const textConclusionOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.6) / 0.3));

  const handleCannonFire = () => {
    setIsFiring(false);
    setTimeout(() => {
      setIsFiring(true);
      playCelestialHum();
    }, 50);
  };

  return (
    <section
      id="moon"
      className="relative min-h-[180vh] w-full bg-[#121522] text-[#F8F5EE] overflow-hidden cosmic-gradient border-t border-[#262D42]"
    >
      {/* Background Starfield */}
      <div className="absolute inset-0 space-star-field opacity-80 pointer-events-none" />

      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-between py-12 z-10">
        {/* Chapter Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B48325]/20 border border-[#D4AF37]/40 text-xs font-serif uppercase tracking-widest text-[#D4AF37]">
            <span>Chapter III</span>
            <span>•</span>
            <span>The Celestial Synthesis</span>
          </div>
          <h2 className="mt-2 font-heading text-2xl sm:text-4xl text-[#FFFFFF] font-bold">
            FROM THE APPLE TO THE MOON
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#B8C2D8]">
            The Moon does not float in mystical suspension; it is perpetually falling.
          </p>
        </div>

        {/* Central Planetary & Orbital Canvas Stage */}
        <div className="relative w-full h-[380px] sm:h-[440px] my-auto flex items-center justify-center">
          {/* Orbital Ellipse Guide */}
          <div
            className="absolute border border-[#D4AF37]/25 rounded-full pointer-events-none"
            style={{
              width: `${orbitRadius * 2}px`,
              height: `${orbitRadius * 2 * 0.45}px`,
              transform: 'scale(1.2)',
            }}
          />

          {/* Gravitational Flux Lines Connecting Earth to Moon */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <line
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${moonX * 1.2}px)`}
              y2={`calc(50% + ${moonY * 1.2}px)`}
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              opacity={0.6}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-16"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          </svg>

          {/* Central Earth Globe */}
          <div
            className="relative z-20 flex items-center justify-center transition-transform duration-100"
            style={{ transform: `scale(${earthScale})` }}
          >
            {/* Atmospheric Glow */}
            <div className="absolute w-44 h-44 rounded-full bg-blue-500/20 blur-xl pointer-events-none" />

            {/* Earth Sphere SVG */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full shadow-2xl overflow-hidden border border-blue-400/30">
              <svg viewBox="0 0 160 160" className="w-full h-full bg-[#183B63]">
                <defs>
                  <radialGradient id="earthShade" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#2E6BA8" />
                    <stop offset="50%" stopColor="#1E4774" />
                    <stop offset="90%" stopColor="#0B1A2C" />
                    <stop offset="100%" stopColor="#050C16" />
                  </radialGradient>
                </defs>
                <circle cx="80" cy="80" r="80" fill="url(#earthShade)" />
                {/* Rotating Continents Silhouette */}
                <g opacity="0.85">
                  <path
                    d="M 40 45 C 50 30, 80 35, 95 50 C 110 65, 100 85, 85 90 C 70 95, 45 80, 40 45 Z"
                    fill="#3F7A4D"
                  />
                  <path
                    d="M 90 95 C 105 85, 120 90, 130 110 C 120 135, 95 140, 80 125 C 75 110, 85 100, 90 95 Z"
                    fill="#356841"
                  />
                  <path
                    d="M 25 90 C 35 85, 45 95, 40 115 C 30 120, 20 110, 25 90 Z"
                    fill="#3F7A4D"
                  />
                </g>
                {/* Cloud swirls */}
                <path
                  d="M 10 70 Q 50 60, 90 75 Q 130 90, 155 70"
                  stroke="#FFFFFF"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.35"
                  fill="none"
                />
                <path
                  d="M 30 110 Q 70 125, 120 115"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.25"
                  fill="none"
                />
              </svg>
            </div>

            {/* Micro Apple on Earth surface for scale juxtaposition */}
            <div
              className="absolute -top-4 right-1/2 translate-x-2 z-30 transition-all duration-200"
              style={{
                transform: `scale(${appleScale})`,
                opacity: appleOpacity,
              }}
            >
              <div className="w-6 h-6 flex items-center justify-center bg-red-600 rounded-full border border-white/60 shadow-lg text-[9px] text-white font-bold">
                🍎
              </div>
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-[#D4AF37] bg-black/75 px-1 rounded">
                Apple: Falls directly
              </span>
            </div>
          </div>

          {/* The Orbiting Moon */}
          <div
            className="absolute z-20 pointer-events-none transition-transform duration-75"
            style={{
              transform: `translate3d(${moonX * 1.2}px, ${moonY * 1.2}px, 0)`,
            }}
          >
            {/* Moon sphere */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#E5E8EE] shadow-[0_0_18px_rgba(255,255,255,0.4)] border border-[#C5CAD8] overflow-hidden flex items-center justify-center">
              {/* Moon craters */}
              <div className="absolute w-2 h-2 rounded-full bg-[#9FA6B8]/40 top-1.5 left-2" />
              <div className="absolute w-3 h-3 rounded-full bg-[#9FA6B8]/50 bottom-2 right-2.5" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-[#9FA6B8]/40 bottom-4 left-3" />
            </div>

            {/* Moon vector callout badge */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono text-[#E5E8EE] bg-black/80 px-2 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-md">
              Moon: Orbital Fall
            </div>
          </div>

          {/* Vector Decomposition HUD overlay */}
          <div
            style={{ opacity: vectorsOpacity }}
            className="absolute bottom-2 left-4 sm:left-10 p-3 sm:p-4 rounded-xl bg-[#0E121E]/90 backdrop-blur-md border border-[#2F3952] max-w-xs transition-opacity duration-300 pointer-events-auto"
          >
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] flex items-center gap-1.5 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Orbital Vector Mechanics</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Gravity Vector</p>
                  <p className="text-[11px] text-[#A8B2C8]">Accelerates directly toward Earth’s core</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <MoveRight className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-white">Forward Velocity</p>
                  <p className="text-[11px] text-[#A8B2C8]">Inertia carries Moon sideways</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#D4AF37]">Resulting Trajectory</p>
                  <p className="text-[11px] text-[#A8B2C8]">Curves in sync with Earth’s round horizon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newton's Cannonball Thought Experiment Interactive Box & Conclusion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center z-20">
          {/* Main Philosophical Verdict */}
          <div
            style={{ opacity: textConclusionOpacity }}
            className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-[#0E1321]/90 backdrop-blur-md border border-[#2D364D] shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs font-serif italic text-[#D4AF37] mb-1">
              <span>The Great Equalization</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[#FFFFFF] font-medium leading-tight">
              “An orbit is, in a sense, a continuous fall.”
            </p>
            <p className="mt-2 text-xs sm:text-sm text-[#B0BCDB] leading-relaxed">
              If you throw a stone, it falls to the ground. If you throw it faster, it travels further. If you throw it fast enough, the ground curves away beneath it just as fast as gravity pulls it down. It never hits the Earth; it falls around it forever.
            </p>
          </div>

          {/* Interactive Newton's Cannon Simulator */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-[#171D2E] border border-[#374462] shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-heading font-bold text-[#D4AF37] uppercase tracking-wider">
                Newton's Mountain Cannon
              </span>
              <span className="font-mono text-xs text-white bg-[#0B0F1A] px-2 py-0.5 rounded border border-[#2A344C]">
                {cannonVelocity} km/s
              </span>
            </div>

            {/* Velocity Slider */}
            <div className="space-y-1.5">
              <input
                type="range"
                min="0"
                max="12"
                step="0.1"
                value={cannonVelocity}
                onChange={(e) => {
                  setCannonVelocity(parseFloat(e.target.value));
                  setIsFiring(false);
                }}
                className="w-full h-1.5 bg-[#2A354C] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8C9BB8]">
                <span>0 (Drop)</span>
                <span>4.0 (Arc)</span>
                <span className="text-[#D4AF37] font-semibold">7.9 (Orbit)</span>
                <span className="text-emerald-400 font-semibold">11.2 (Escape)</span>
              </div>
            </div>

            {/* Trajectory description */}
            <div className="mt-3 p-2.5 rounded-lg bg-[#0E121E] border border-[#2A3348] text-xs">
              {cannonVelocity < 5 ? (
                <p className="text-red-300">
                  <span className="font-bold">Sub-orbital:</span> Projectile hits Earth after a parabolic path.
                </p>
              ) : cannonVelocity < 7.8 ? (
                <p className="text-amber-300">
                  <span className="font-bold">Long range:</span> Curves across continents, but still impacts.
                </p>
              ) : cannonVelocity <= 8.5 ? (
                <p className="text-emerald-300">
                  <span className="font-bold">Circular Orbit!</span> The rate of fall matches Earth's curvature.
                </p>
              ) : cannonVelocity < 11.2 ? (
                <p className="text-cyan-300">
                  <span className="font-bold">Elliptical Orbit:</span> High orbital apogee into deep space.
                </p>
              ) : (
                <p className="text-purple-300">
                  <span className="font-bold">Escape Velocity:</span> Breaks Earth's gravity entirely!
                </p>
              )}
            </div>

            {/* Test Fire Button */}
            <button
              onClick={handleCannonFire}
              className="mt-2.5 w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#B48325] to-[#D4AF37] text-[#121522] font-semibold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-[0.99] transition-all"
            >
              {isFiring ? <RotateCcw className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isFiring ? 'Fire Again' : 'Simulate Cannon Fire'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
