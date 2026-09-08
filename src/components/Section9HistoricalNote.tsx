import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, FileText, CheckCircle2, XCircle, BookOpen, Quote } from 'lucide-react';

export default function Section9HistoricalNote() {
  const [activeView, setActiveView] = useState<'both' | 'myth' | 'history'>('both');

  return (
    <section
      id="myth-note"
      className="relative min-h-screen w-full bg-[#EFE8DC] text-[#24211E] py-20 px-4 sm:px-8 border-t border-[#DCD0BB] parchment-texture overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col justify-between h-full">
        {/* Section Chapter Header */}
        <div className="border-b border-[#D5C6AA] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCcb] border border-[#CDBEA0] text-xs font-serif uppercase tracking-widest text-[#8C6218]">
            <FileText className="w-3.5 h-3.5 text-[#B48325]" />
            <span>Chapter IX</span>
            <span>•</span>
            <span>Curatorial Investigation</span>
          </div>
          <h2 className="mt-2 font-heading text-2xl sm:text-4xl text-[#24211E] font-bold">
            THE HISTORICAL RECORD: DID AN APPLE HIT NEWTON?
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#685C4F]">
            Separating later romantic folklore from 17th-century documentary testimony.
          </p>
        </div>

        {/* Primary Placard Callout */}
        <div className="my-8 p-6 sm:p-8 rounded-2xl bg-[#FCFAF5] border-2 border-[#D8C7A5] shadow-lg relative">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#24211E]">
                “Did an apple really hit Newton on the head?”
              </h3>
              <p className="mt-1 font-serif text-lg text-[#8C6218] font-medium italic">
                “Probably not quite like the legend suggests.”
              </p>
              <p className="mt-3 text-sm text-[#4E4133] leading-relaxed">
                Generations of cartoons and schoolbooks depict an apple abruptly bonking Isaac Newton on the scalp, triggering an instantaneous epiphany. But authentic primary sources tell a far more nuanced, contemplative story.
              </p>
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex gap-2 mt-6 border-t border-[#E5DAC4] pt-4">
            <button
              onClick={() => setActiveView('both')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeView === 'both' ? 'bg-[#24211E] text-white' : 'bg-[#EFE8DC] text-[#605241] hover:bg-[#E5DDCB]'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setActiveView('myth')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeView === 'myth' ? 'bg-[#991B1B] text-white' : 'bg-[#EFE8DC] text-[#605241] hover:bg-[#E5DDCB]'
              }`}
            >
              The Popular Myth
            </button>
            <button
              onClick={() => setActiveView('history')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeView === 'history' ? 'bg-[#15803D] text-white' : 'bg-[#EFE8DC] text-[#605241] hover:bg-[#E5DDCB]'
              }`}
            >
              The Documented History
            </button>
          </div>
        </div>

        {/* Side-by-Side Interactive Exhibition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          {/* Card A: The Myth */}
          {(activeView === 'both' || activeView === 'myth') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#FAF4F2] border border-[#EAC4BA] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-red-800 mb-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span>The Popular Embellishment</span>
                </div>
                <h4 className="font-heading text-lg font-bold text-[#3B1713]">
                  The “Head Concussion” Legend
                </h4>
                <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#5C2B24] leading-relaxed">
                  <p>
                    • <strong>The Trope:</strong> Newton was sleeping or lazily daydreaming under an apple tree when a falling fruit struck his cranium, causing an instant lightbulb moment.
                  </p>
                  <p>
                    • <strong>Origins:</strong> Popularized in the 18th and 19th centuries by satirical cartoonists and popular biographers looking for a dramatic punchline to explain genius.
                  </p>
                  <p>
                    • <strong>The Flaw:</strong> Science rarely happens by being struck on the skull; Newton had spent years reading Kepler, Galileo, and Descartes before the orchard visit.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8C5BC] text-[11px] font-serif italic text-red-900/80">
                Verdict: A charming comedic caricature without factual basis in any of Newton’s diaries.
              </div>
            </motion.div>
          )}

          {/* Card B: The Documented History */}
          {(activeView === 'both' || activeView === 'history') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#F4F9F2] border border-[#BFDFBA] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-emerald-800 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>The Primary Historical Record</span>
                </div>
                <h4 className="font-heading text-lg font-bold text-[#143B1D]">
                  The Contemplative Observation
                </h4>
                <div className="mt-3 space-y-2 text-xs sm:text-sm text-[#27522E] leading-relaxed">
                  <p>
                    • <strong>The Testimony:</strong> Dr. William Stukeley, Newton’s close friend and biographer, recorded a conversation with Newton over tea in 1726 under the shade of apple trees.
                  </p>
                  <p>
                    • <strong>Newton’s Words:</strong> Newton recalled sitting in the garden in a “contemplative mood” when an apple fell to the ground, prompting him to ponder why it fell perpendicular to the Earth’s center.
                  </p>
                  <p>
                    • <strong>The Tree Still Lives:</strong> A descendant “Flower of Kent” apple tree still grows at Woolsthorpe Manor and is preserved by the UK National Trust today.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#BFDFBA] text-[11px] font-serif italic text-emerald-950/80">
                Verdict: Newton observed a falling fruit, but it was months of mathematical rigor that explained it.
              </div>
            </motion.div>
          )}
        </div>

        {/* William Stukeley 1752 Historical Manuscript Excerpt */}
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#FAF5E8] border border-[#D8C7A5] relative">
          <Quote className="absolute top-4 right-6 w-8 h-8 text-[#B48325]/20 pointer-events-none" />
          <div className="flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-[#8C6218] mt-1 shrink-0" />
            <div>
              <p className="font-heading text-xs uppercase tracking-widest text-[#8C6218] font-bold">
                From William Stukeley’s Memoirs of Sir Isaac Newton’s Life (1752)
              </p>
              <blockquote className="mt-2 font-serif text-sm sm:text-base italic text-[#3A3024] leading-relaxed">
                “We went into the garden, & drank thea under the shade of some appletrees... he told me, he was just in the same situation, as when formerly, the notion of gravitation came into his mind. It was occasion’d by the fall of an apple, as he sat in a contemplative mood. ‘Why should that apple always descend perpendicularly to the ground,’ thought he to himself: ‘why should it not go sideways, or upwards? But constantly to the earths centre?’”
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
