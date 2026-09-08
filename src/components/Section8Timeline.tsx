import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronRight, BookOpen, Clock, Award, Sparkles } from 'lucide-react';
import { TimelineEvent } from '../types';

const timelineEvents: TimelineEvent[] = [
  {
    year: '1661',
    period: 'Early Cambridge Days',
    title: 'Admission to Trinity College',
    location: 'Cambridge, England',
    summary: 'A solitary, self-driven sizar studying mathematics and natural philosophy.',
    details: 'Newton entered Cambridge as a subsizar, performing menial chores to fund his studies. Discarding standard Aristotelian scholasticism, he filled his notebook Quaestiones with private inquiries: "Amicus Plato, amicus Aristoteles, magis tamen amica veritas" (Plato is my friend, Aristotle is my friend, but my greatest friend is truth).',
    latinQuote: 'Amicus Plato, sed magis amica veritas.',
    latinTranslation: 'Plato is my friend, but truth is a better friend.',
    tag: 'Foundations',
  },
  {
    year: '1665–1666',
    period: 'Annus Mirabilis (The Year of Wonders)',
    title: 'The Orchard Insight at Woolsthorpe',
    location: 'Woolsthorpe Manor, Lincolnshire',
    summary: 'The Great Plague shuts Cambridge; Newton retreats home and uncovers gravity, calculus, and optics.',
    details: 'Forced into rural seclusion away from London’s devastating bubonic outbreak, the 23-year-old Isaac experienced eighteen months of unprecedented intellectual fury. In the family apple orchard, he contemplated the fall of the fruit, calculated the acceleration of the Moon, and established the inverse-square law of gravitation.',
    latinQuote: 'In eodem anno 1666 coepi cogitare de gravitate extendente se ad orbem Lunae...',
    latinTranslation: 'In the same year 1666 I began to think of gravity extending to the orb of the Moon...',
    tag: 'Discovery',
  },
  {
    year: '1684',
    period: 'The Historic Visit',
    title: 'Edmond Halley Visits Cambridge',
    location: 'Trinity College, Cambridge',
    summary: 'A wager between London scholars leads Halley to ask Newton the fateful planetary question.',
    details: 'Astronomer Edmond Halley, Christopher Wren, and Robert Hooke had debated what shape planetary orbits would take under an inverse-square attraction. Halley visited Cambridge and asked Newton. Newton answered immediately without hesitation: "An ellipse." Astonished, Halley urged Newton to publish his mathematical demonstrations.',
    latinQuote: 'Motu Corporum in Gyrum',
    latinTranslation: 'On the Motion of Bodies in an Orbit',
    tag: 'Turning Point',
  },
  {
    year: '1687',
    period: 'The Masterpiece',
    title: 'Publication of the Principia',
    location: 'Royal Society of London',
    summary: 'Philosophiae Naturalis Principia Mathematica defines universal laws of motion and gravitation.',
    details: 'Financed and edited by Edmond Halley, the three volumes of the Principia revolutionized science. Newton unified earthly projectiles and celestial mechanics under three universal laws of motion and the law of universal gravitation, establishing the bedrock of physics for the next two centuries.',
    latinQuote: 'Hypotheses non fingo.',
    latinTranslation: 'I frame no hypotheses.',
    tag: 'Publication',
  },
  {
    year: '1798',
    period: 'The Direct Measurement',
    title: 'Cavendish Weighs the Earth',
    location: 'Clapham Common, London',
    summary: 'Henry Cavendish measures G with a delicate torsion balance, verifying Newton’s constant.',
    details: 'Using a sensitive torsion balance designed by John Michell, Cavendish measured the tiny gravitational attraction between large lead spheres. By determining G (6.74 × 10⁻¹¹ m³·kg⁻¹·s⁻²), he calculated the density and mass of the Earth (5.97 × 10²⁴ kg) with astonishing 1% precision.',
    latinQuote: 'Pondere Terram Metiri',
    latinTranslation: 'To measure the weight of the Earth',
    tag: 'Verification',
  },
];

export default function Section8Timeline() {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(1); // Default to Annus Mirabilis

  const currentEvent = timelineEvents[selectedEventIndex];

  return (
    <section
      id="timeline"
      className="relative min-h-screen w-full bg-[#F5EFE3] text-[#24211E] py-20 px-4 sm:px-8 border-t border-[#DED1BA] parchment-texture overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-between h-full">
        {/* Section Header */}
        <div className="border-b border-[#D8C9AE] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DEC8] border border-[#CFBF9F] text-xs font-serif uppercase tracking-widest text-[#8C6218]">
            <Clock className="w-3.5 h-3.5 text-[#B48325]" />
            <span>Chapter VIII</span>
            <span>•</span>
            <span>Chronicle of Discovery</span>
          </div>
          <h2 className="mt-2 font-heading text-2xl sm:text-4xl text-[#24211E] font-bold">
            TIMELINE: THE GENESIS OF A LAW
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#685C4F]">
            From a solitary Cambridge scholar to the mathematical architect of the universe.
          </p>
        </div>

        {/* Interactive Timeline Rail */}
        <div className="my-10 relative">
          {/* Horizontal connecting track */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-4 right-4 h-1 bg-[#D9CBAC] z-0" />

          {/* Event Node Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 relative z-10">
            {timelineEvents.map((evt, idx) => {
              const isSelected = selectedEventIndex === idx;
              return (
                <button
                  key={evt.year}
                  onClick={() => setSelectedEventIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[110px] ${
                    isSelected
                      ? 'bg-[#24211E] text-[#F8F5EE] border-[#24211E] shadow-lg scale-102 ring-2 ring-[#B48325]/50'
                      : 'bg-[#FAF6EE] text-[#42372C] border-[#D8C9AE] hover:bg-[#F2EADB]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-base sm:text-lg font-heading font-bold ${
                        isSelected ? 'text-[#D4AF37]' : 'text-[#8C6218]'
                      }`}
                    >
                      {evt.year}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#EADECA] text-[#6E5E4C]'
                      }`}
                    >
                      {evt.tag}
                    </span>
                  </div>

                  <p
                    className={`mt-2 font-serif text-xs leading-snug line-clamp-2 ${
                      isSelected ? 'text-white' : 'text-[#24211E]'
                    }`}
                  >
                    {evt.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Event Detail Archival Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.year}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-10 rounded-2xl bg-[#FCFAF4] border-2 border-[#D8C7A5] shadow-xl relative overflow-hidden"
          >
            {/* Watermark Year */}
            <div className="absolute top-2 right-4 text-7xl sm:text-9xl font-heading font-bold text-[#EFE7D5]/70 pointer-events-none select-none">
              {currentEvent.year.split('–')[0]}
            </div>

            <div className="relative z-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#8C6218] text-white text-xs font-mono font-bold">
                  ANNO {currentEvent.year}
                </span>
                <span className="text-xs font-serif italic text-[#7A6B56]">
                  {currentEvent.location}
                </span>
                <span className="text-xs text-[#B48325]">•</span>
                <span className="text-xs font-semibold text-[#8C6218]">
                  {currentEvent.period}
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-3xl font-bold text-[#24211E]">
                {currentEvent.title}
              </h3>

              <p className="mt-3 font-serif text-base sm:text-lg text-[#3E342A] italic leading-relaxed">
                “{currentEvent.summary}”
              </p>

              <div className="mt-4 pt-4 border-t border-[#E8DFC9] text-xs sm:text-sm text-[#4E4235] leading-relaxed">
                {currentEvent.details}
              </div>

              {/* Latin Manuscript Excerpt */}
              {currentEvent.latinQuote && (
                <div className="mt-5 p-4 rounded-xl bg-[#F6EFE0] border border-[#DFD0B0] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#B48325]/15 flex items-center justify-center text-[#8C6218] shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-serif-display text-sm sm:text-base font-semibold text-[#24211E] italic">
                      “{currentEvent.latinQuote}”
                    </p>
                    <p className="mt-0.5 text-xs text-[#7A6B56]">
                      — {currentEvent.latinTranslation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
