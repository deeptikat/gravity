import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Sliders, ArrowLeft, ArrowRight, Activity } from 'lucide-react';
import { playAppleDropSound } from '../utils/audio';

export default function Section5GravityExperiment() {
  const [distanceMultiplier, setDistanceMultiplier] = useState<number>(1.5); // 1 to 4
  const [isSimulatingDrop, setIsSimulatingDrop] = useState<boolean>(false);
  const [dropPosition, setDropPosition] = useState<number | null>(null);
  const animationRef = useRef<number | null>(null);

  // Force calculation: F = 1 / (d^2)
  const relativeForce = 1 / (distanceMultiplier * distanceMultiplier);
  const forcePercentage = Math.round(relativeForce * 100);

  // Pixel distance mapping: 1x = 120px, 4x = 420px
  const baseDistance = 120;
  const currentPixelDistance = distanceMultiplier * baseDistance;

  // Arrow thickness & length scaling
  const arrowLength = Math.max(16, relativeForce * 90);
  const arrowStrokeWidth = Math.max(1.5, relativeForce * 5.5);

  const startDropSimulation = () => {
    if (isSimulatingDrop) return;
    setIsSimulatingDrop(true);
    playAppleDropSound();

    let pos = currentPixelDistance;
    let velocity = 0;
    const earthSurface = 50; // stop at Earth radius

    const step = () => {
      // Acceleration increases as object gets closer (inverse square!)
      const currDistRatio = Math.max(0.7, pos / baseDistance);
      const accel = 0.5 / (currDistRatio * currDistRatio);
      velocity += accel;
      pos -= velocity;

      if (pos <= earthSurface) {
        setDropPosition(earthSurface);
        setIsSimulatingDrop(false);
        playAppleDropSound();
        return;
      }

      setDropPosition(pos);
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const resetDrop = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setIsSimulatingDrop(false);
    setDropPosition(null);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const displayDistance = dropPosition !== null ? (dropPosition / baseDistance).toFixed(2) : distanceMultiplier.toFixed(1);
  const activeDistanceX = dropPosition !== null ? dropPosition : currentPixelDistance;

  return (
    <section
      id="gravity-lab"
      className="relative min-h-screen w-full bg-[#F4EEE2] text-[#24211E] py-20 px-4 sm:px-8 border-t border-[#DECFA] parchment-texture overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D8C9AE] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE3D0] border border-[#D3C19F] text-xs font-serif uppercase tracking-widest text-[#8C6218]">
              <span>Chapter V</span>
              <span>•</span>
              <span>Interactive Laboratory</span>
            </div>
            <h2 className="mt-2 font-heading text-2xl sm:text-4xl text-[#24211E] font-bold">
              EXPERIMENT 1: DISTANCE & INVERSE-SQUARE
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-[#685C4F]">
              Directly manipulate the separation between Earth and an object to witness how gravity dilutes across space.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#FAF6EE] px-4 py-2 rounded-xl border border-[#D8C9AE] shadow-xs">
            <span className="text-xs uppercase font-bold tracking-wider text-[#8C6218]">Rule:</span>
            <span className="font-serif italic text-xs sm:text-sm text-[#3E352B]">
              “Closer → Stronger” &nbsp;•&nbsp; “Farther → Weaker”
            </span>
          </div>
        </div>

        {/* The Interactive Physics Stage */}
        <div className="relative w-full h-[360px] sm:h-[420px] my-8 rounded-2xl bg-[#FCFAF4] border-2 border-[#D8C7A5] shadow-lg p-6 flex flex-col justify-between overflow-hidden">
          {/* Faint Metric Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#EFE5D0_1px,transparent_1px),linear-gradient(to_bottom,#EFE5D0_1px,transparent_1px)] bg-[size:40px_40px] opacity-45 pointer-events-none" />

          {/* Metric scale markers across the floor */}
          <div className="absolute bottom-6 left-28 right-12 h-8 border-b-2 border-[#B48325]/40 flex justify-between items-end text-[10px] font-mono text-[#8C6218]">
            <div className="flex flex-col items-center">
              <span className="w-0.5 h-3 bg-[#B48325]/60" />
              <span>1r (100%)</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-0.5 h-3 bg-[#B48325]/60" />
              <span>2r (25%)</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-0.5 h-3 bg-[#B48325]/60" />
              <span>3r (11%)</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-0.5 h-3 bg-[#B48325]/60" />
              <span>4r (6%)</span>
            </div>
          </div>

          {/* Stage HUD Status Overlay */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-[#FAF5E8]/90 px-3 py-1.5 rounded-lg border border-[#D5C7AA] text-xs font-mono">
              <Activity className="w-4 h-4 text-[#B48325]" />
              <span className="text-[#655542]">Distance:</span>
              <span className="font-bold text-[#24211E]">{displayDistance}× Earth Radius</span>
            </div>

            <div className="flex items-center gap-3 bg-[#24211E] text-[#F8F5EE] px-4 py-1.5 rounded-lg shadow-md">
              <span className="text-xs font-serif text-[#D4AF37]">Gravitational Pull:</span>
              <span className="text-sm font-mono font-bold text-white">{forcePercentage}%</span>
              <span className="text-xs font-serif italic text-[#C8BAA7]">
                (F ∝ 1 / {parseFloat(displayDistance) ** 2 > 0 ? (parseFloat(displayDistance) ** 2).toFixed(2) : '1'})
              </span>
            </div>
          </div>

          {/* Physical Bodies Stage (Earth on left, Object on right) */}
          <div className="relative flex-1 flex items-center">
            {/* The Large Earth (Anchor on the left) */}
            <div className="relative z-20 flex flex-col items-center ml-2 sm:ml-8">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#143E6B] via-[#1D5E9E] to-[#4B8ED1] shadow-2xl border-2 border-[#4A88C7] flex items-center justify-center overflow-hidden">
                {/* Earth Continents */}
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
                  <path d="M 25 30 Q 45 20, 60 35 Q 75 50, 60 70 Q 40 85, 20 65 Z" fill="#3D7E4F" />
                  <path d="M 65 60 Q 85 55, 90 75 Q 80 90, 60 85 Z" fill="#336E43" />
                  <path d="M 10 40 Q 50 35, 90 45" stroke="#FFFFFF" strokeWidth="4" opacity="0.3" fill="none" />
                </svg>
                {/* Center marker */}
                <div className="absolute w-2 h-2 rounded-full bg-white/70" />
              </div>
              <span className="mt-2 text-xs font-heading font-bold text-[#24211E]">EARTH</span>
              <span className="text-[10px] font-mono text-[#7A6B56]">Mass M</span>
            </div>

            {/* Dynamic Gravitational Vector Stream & Lines */}
            <svg
              className="absolute left-36 top-1/2 -translate-y-1/2 h-20 pointer-events-none overflow-visible"
              style={{ width: `${Math.max(20, activeDistanceX - 40)}px` }}
            >
              {/* Force vector field lines */}
              <line
                x1="0"
                y1="40"
                x2={Math.max(20, activeDistanceX - 40)}
                y2="40"
                stroke="#B48325"
                strokeWidth={arrowStrokeWidth}
                strokeDasharray="6,4"
                opacity={Math.max(0.3, relativeForce)}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="10;0"
                  dur={`${Math.max(0.3, 1.5 - relativeForce)}s`}
                  repeatCount="indefinite"
                />
              </line>

              {/* Inward Arrow pointing to Earth */}
              <polygon
                points={`20,33 0,40 20,47`}
                fill="#B48325"
                opacity={Math.max(0.4, relativeForce)}
              />
            </svg>

            {/* The Movable Test Object (Apple or Satellite) */}
            <div
              className="absolute z-20 flex flex-col items-center transition-all cursor-grab active:cursor-grabbing"
              style={{
                left: `calc(40px + ${activeDistanceX}px)`,
                transition: isSimulatingDrop ? 'none' : 'left 0.15s ease-out',
              }}
            >
              {/* Dynamic Force Arrow Vector on Object */}
              <div
                className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
                style={{ width: `${arrowLength}px` }}
              >
                <div
                  className="h-1 bg-red-600 rounded-full w-full"
                  style={{ height: `${arrowStrokeWidth}px` }}
                />
                <ArrowLeft
                  className="w-4 h-4 text-red-600 -ml-1.5 shrink-0"
                  style={{ strokeWidth: Math.min(4, arrowStrokeWidth) }}
                />
              </div>

              {/* Object graphic (Apple icon) */}
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-b from-[#E5392B] to-[#99140C] border-2 border-white/80 shadow-lg flex items-center justify-center text-lg">
                🍎
              </div>
              <span className="mt-1 text-[11px] font-bold text-[#24211E]">Test Object</span>
              <span className="text-[10px] font-mono text-[#B48325]">
                F = {(relativeForce * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Inverse-Square Proportionality Bar Gauge */}
          <div className="relative z-10 grid grid-cols-4 gap-2 pt-2 border-t border-[#E5D7BF]">
            {[
              { dist: '1×', frac: '1/1', pct: '100%', active: distanceMultiplier < 1.5 },
              { dist: '2×', frac: '1/4', pct: '25%', active: distanceMultiplier >= 1.5 && distanceMultiplier < 2.5 },
              { dist: '3×', frac: '1/9', pct: '11.1%', active: distanceMultiplier >= 2.5 && distanceMultiplier < 3.5 },
              { dist: '4×', frac: '1/16', pct: '6.25%', active: distanceMultiplier >= 3.5 },
            ].map((col) => (
              <div
                key={col.dist}
                className={`p-2 rounded-lg border text-center transition-all ${
                  col.active
                    ? 'bg-[#24211E] text-[#F8F5EE] border-[#24211E] shadow-sm'
                    : 'bg-[#FAF5E8] text-[#6B5E51] border-[#E0D4BD]'
                }`}
              >
                <p className="text-[10px] font-serif uppercase tracking-wider">Distance {col.dist}</p>
                <p className={`font-mono font-bold text-sm ${col.active ? 'text-[#D4AF37]' : 'text-[#24211E]'}`}>
                  {col.frac}
                </p>
                <p className="text-[10px] opacity-75">{col.pct} force</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Interactive Controls Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-[#FAF7F0] border border-[#D8C9AE] shadow-xs">
          {/* Distance Slider */}
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="dist-slider" className="flex items-center gap-2 text-sm font-heading font-bold text-[#24211E]">
                <Sliders className="w-4 h-4 text-[#B48325]" />
                <span>SLIDER: DISTANCE FROM EARTH</span>
              </label>
              <span className="font-mono text-sm font-bold text-[#8C6218] bg-[#EDE4D0] px-2.5 py-0.5 rounded border border-[#D5C5A5]">
                {distanceMultiplier.toFixed(1)}× radius
              </span>
            </div>

            <input
              id="dist-slider"
              type="range"
              min="1.0"
              max="4.0"
              step="0.1"
              value={distanceMultiplier}
              disabled={isSimulatingDrop}
              onChange={(e) => {
                setDistanceMultiplier(parseFloat(e.target.value));
                setDropPosition(null);
              }}
              className="w-full h-2.5 bg-[#DED1BA] rounded-lg appearance-none cursor-pointer accent-[#8C6218]"
            />

            <div className="flex justify-between text-xs font-serif italic text-[#786957]">
              <span>1× (At Surface)</span>
              <span>2× (Quarter Force)</span>
              <span>3× (Ninth Force)</span>
              <span>4× (Sixteenth Force)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
            <button
              onClick={startDropSimulation}
              disabled={isSimulatingDrop}
              className="w-full py-2.5 px-4 rounded-xl bg-[#24211E] text-[#F8F5EE] hover:bg-[#3B352F] disabled:opacity-50 transition-all font-semibold text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <Play className="w-4 h-4 text-[#D4AF37] fill-current" />
              <span>Release & Free Fall</span>
            </button>

            <button
              onClick={resetDrop}
              className="w-full py-2 px-4 rounded-xl border border-[#D0C2A4] bg-[#FAF5E8] text-[#635544] hover:bg-[#F2E8D5] transition-all text-xs flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Position</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
