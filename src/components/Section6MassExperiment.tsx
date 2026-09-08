import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, Play, RotateCcw, ArrowRight, ArrowLeft, Scale } from 'lucide-react';
import { playAppleDropSound } from '../utils/audio';

export default function Section6MassExperiment() {
  const [massApple, setMassApple] = useState<number>(1); // 1 to 10
  const [massBoulder, setMassBoulder] = useState<number>(8); // 1 to 20
  const [isSimulatingTug, setIsSimulatingTug] = useState<boolean>(false);
  const [offsetA, setOffsetA] = useState<number>(0);
  const [offsetB, setOffsetB] = useState<number>(0);
  const animRef = useRef<number | null>(null);

  // Force is proportional to m1 * m2
  const combinedForceUnits = massApple * massBoulder;
  // Normalized visual force magnitude (1 to 200)
  const visualForceRatio = combinedForceUnits / (10 * 20); // 0.005 to 1.0
  const arrowWidth = Math.max(18, visualForceRatio * 110);
  const arrowThickness = Math.max(2, visualForceRatio * 7);

  // Simulation: Tug towards center of mass (barycenter)
  const startTugSimulation = () => {
    if (isSimulatingTug) return;
    setIsSimulatingTug(true);
    playAppleDropSound();

    let curA = 0;
    let curB = 0;
    let velA = 0;
    let velB = 0;

    const step = () => {
      // a = F / m -> Smaller mass experiences much higher acceleration!
      const accelA = (combinedForceUnits * 0.04) / massApple;
      const accelB = (combinedForceUnits * 0.04) / massBoulder;

      velA += accelA;
      velB += accelB;

      curA += velA;
      curB += velB;

      const totalDisplacement = curA + curB;
      const maxSpan = 160; // distance to meet

      if (totalDisplacement >= maxSpan) {
        // Adjust to exact collision
        const ratioA = velA / (velA + velB);
        setOffsetA(maxSpan * ratioA);
        setOffsetB(maxSpan * (1 - ratioA));
        setIsSimulatingTug(false);
        playAppleDropSound();
        return;
      }

      setOffsetA(curA);
      setOffsetB(curB);
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
  };

  const resetTug = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setIsSimulatingTug(false);
    setOffsetA(0);
    setOffsetB(0);
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section
      id="mass-lab"
      className="relative min-h-screen w-full bg-[#EFE9DC] text-[#24211E] py-20 px-4 sm:px-8 border-t border-[#DECFA] parchment-texture overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D5C6AA] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCcb] border border-[#CDBE9F] text-xs font-serif uppercase tracking-widest text-[#8C6218]">
              <span>Chapter VI</span>
              <span>•</span>
              <span>Interactive Laboratory</span>
            </div>
            <h2 className="mt-2 font-heading text-2xl sm:text-4xl text-[#24211E] font-bold">
              EXPERIMENT 2: MASS & MUTUAL ATTRACTION
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-[#685C4F]">
              “More mass → stronger gravitational attraction.”
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#FAF6EE] px-4 py-2 rounded-xl border border-[#D5C6AA] shadow-xs">
            <Scale className="w-4 h-4 text-[#B48325]" />
            <span className="font-serif text-xs sm:text-sm text-[#3E352B]">
              F ∝ (m₁ × m₂) • Equal and opposite mutual tug
            </span>
          </div>
        </div>

        {/* The Two-Body Interactive Canvas */}
        <div className="relative w-full h-[360px] sm:h-[420px] my-8 rounded-2xl bg-[#FCFAF4] border-2 border-[#D8C7A5] shadow-lg p-6 flex flex-col justify-between overflow-hidden">
          {/* Gravitational Field background lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#D5C7AA_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

          {/* Status HUD */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-[#FAF5E8]/90 px-3 py-1.5 rounded-lg border border-[#D5C7AA] text-xs font-mono">
              <span className="text-[#655542]">Mutual Force Product:</span>
              <span className="font-bold text-[#8C6218]">
                {massApple} kg × {massBoulder * 10} kg = {combinedForceUnits * 10} N·units
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#24211E] text-[#F8F5EE] px-4 py-1.5 rounded-lg shadow-md text-xs">
              <span className="text-[#D4AF37] font-semibold">Equal & Opposite:</span>
              <span>F₁ = F₂ (Newton's 3rd Law)</span>
            </div>
          </div>

          {/* Mutual Tug Arena */}
          <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16">
            {/* Object A: The Small Apple */}
            <div
              className="relative flex flex-col items-center z-20 transition-transform"
              style={{
                transform: `translateX(${offsetA}px)`,
                transition: isSimulatingTug ? 'none' : 'transform 0.15s ease-out',
              }}
            >
              {/* Apple Visual Scaling with Mass */}
              <div
                className="relative rounded-full bg-gradient-to-b from-[#E5392B] to-[#8C140C] border-2 border-white shadow-md flex items-center justify-center transition-all duration-200"
                style={{
                  width: `${36 + massApple * 3}px`,
                  height: `${36 + massApple * 3}px`,
                }}
              >
                <span className="text-sm">🍎</span>
              </div>
              <span className="mt-2 text-xs font-bold text-[#24211E]">Object A (Apple)</span>
              <span className="text-[11px] font-mono text-[#8C6218]">m₁ = {massApple} kg</span>

              {/* Force Arrow on Apple pulling toward Boulder */}
              <div
                className="absolute left-full top-1/2 -translate-y-1/2 flex items-center pointer-events-none ml-2"
                style={{ width: `${arrowWidth}px` }}
              >
                <div
                  className="h-1 bg-[#B48325] rounded-full w-full"
                  style={{ height: `${arrowThickness}px` }}
                />
                <ArrowRight
                  className="w-4 h-4 text-[#B48325] -ml-2 shrink-0"
                  style={{ strokeWidth: Math.min(4, arrowThickness) }}
                />
              </div>
            </div>

            {/* Center Field Gravitational Flux Line */}
            <div className="flex-1 mx-16 relative flex items-center justify-center h-8">
              <div className="w-full border-t-2 border-dashed border-[#C5B495]" />
              {/* Center of Mass (Barycenter) marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
                style={{
                  left: `${(massBoulder / (massApple + massBoulder)) * 100}%`,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#8C6218] border border-white" />
                <span className="text-[9px] font-mono whitespace-nowrap text-[#8C6218] mt-1 bg-[#FAF6EE] px-1 rounded">
                  Barycenter
                </span>
              </div>
            </div>

            {/* Object B: The Large Boulder / Planetary Mass */}
            <div
              className="relative flex flex-col items-center z-20 transition-transform"
              style={{
                transform: `translateX(${-offsetB}px)`,
                transition: isSimulatingTug ? 'none' : 'transform 0.15s ease-out',
              }}
            >
              {/* Force Arrow on Boulder pulling toward Apple */}
              <div
                className="absolute right-full top-1/2 -translate-y-1/2 flex items-center pointer-events-none mr-2"
                style={{ width: `${arrowWidth}px` }}
              >
                <ArrowLeft
                  className="w-4 h-4 text-[#B48325] -mr-2 shrink-0"
                  style={{ strokeWidth: Math.min(4, arrowThickness) }}
                />
                <div
                  className="h-1 bg-[#B48325] rounded-full w-full"
                  style={{ height: `${arrowThickness}px` }}
                />
              </div>

              {/* Boulder Visual Scaling with Mass */}
              <div
                className="relative rounded-2xl bg-gradient-to-tr from-[#38332E] via-[#5A5046] to-[#786E63] border-2 border-[#8A7D6F] shadow-xl flex items-center justify-center text-white transition-all duration-200"
                style={{
                  width: `${60 + massBoulder * 3.5}px`,
                  height: `${60 + massBoulder * 3.5}px`,
                }}
              >
                {/* Craggy stone texture lines */}
                <svg viewBox="0 0 60 60" className="w-full h-full opacity-30 pointer-events-none">
                  <path d="M 10 15 L 25 35 L 45 20 L 50 45" stroke="#FFF" strokeWidth="1.5" fill="none" />
                  <path d="M 20 45 L 35 55" stroke="#FFF" strokeWidth="1" fill="none" />
                </svg>
                <span className="font-heading font-bold text-xs">🪨</span>
              </div>
              <span className="mt-2 text-xs font-bold text-[#24211E]">Object B (Boulder)</span>
              <span className="text-[11px] font-mono text-[#8C6218]">m₂ = {massBoulder * 10} kg</span>
            </div>
          </div>

          {/* Educational Insight footer */}
          <div className="relative z-10 p-3 rounded-xl bg-[#FAF5E8] border border-[#E0D3BC] text-xs text-[#524535] flex items-center justify-between">
            <span>
              <strong>Key Principle:</strong> Both bodies feel the <em>exact same force magnitude</em>. However, the lighter apple accelerates much faster because acceleration <span className="font-mono font-semibold">a = F/m</span>.
            </span>
          </div>
        </div>

        {/* Dual Sliders and Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-[#FAF7F0] border border-[#D5C6AA] shadow-xs">
          {/* Slider 1: Apple Mass */}
          <div className="md:col-span-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="apple-slider" className="text-xs font-heading font-bold text-[#24211E]">
                MASS OF APPLE (m₁)
              </label>
              <span className="font-mono text-xs text-[#8C6218] bg-[#EDE4D0] px-2 py-0.5 rounded">
                {massApple} kg
              </span>
            </div>
            <input
              id="apple-slider"
              type="range"
              min="1"
              max="10"
              value={massApple}
              disabled={isSimulatingTug}
              onChange={(e) => {
                setMassApple(parseInt(e.target.value));
                setOffsetA(0);
                setOffsetB(0);
              }}
              className="w-full h-2 bg-[#DED1BA] rounded-lg appearance-none cursor-pointer accent-[#8C6218]"
            />
          </div>

          {/* Slider 2: Boulder Mass */}
          <div className="md:col-span-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="boulder-slider" className="text-xs font-heading font-bold text-[#24211E]">
                MASS OF BOULDER (m₂)
              </label>
              <span className="font-mono text-xs text-[#8C6218] bg-[#EDE4D0] px-2 py-0.5 rounded">
                {massBoulder * 10} kg
              </span>
            </div>
            <input
              id="boulder-slider"
              type="range"
              min="2"
              max="20"
              value={massBoulder}
              disabled={isSimulatingTug}
              onChange={(e) => {
                setMassBoulder(parseInt(e.target.value));
                setOffsetA(0);
                setOffsetB(0);
              }}
              className="w-full h-2 bg-[#DED1BA] rounded-lg appearance-none cursor-pointer accent-[#8C6218]"
            />
          </div>

          {/* Simulation Trigger */}
          <div className="md:col-span-4 flex gap-2">
            <button
              onClick={startTugSimulation}
              disabled={isSimulatingTug}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#24211E] text-[#F8F5EE] hover:bg-[#3B352F] disabled:opacity-50 transition-all font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
              <span>Simulate Attraction</span>
            </button>

            <button
              onClick={resetTug}
              className="py-2.5 px-3 rounded-xl border border-[#D0C2A4] bg-[#FAF5E8] text-[#635544] hover:bg-[#F2E8D5] transition-all text-xs flex items-center justify-center"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
