interface SideNavProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

const sections = [
  { id: 'hero', label: 'Prologue: The Apple Tree' },
  { id: 'orchard', label: 'I. The Orchard Fall' },
  { id: 'question', label: 'II. Newton’s Question' },
  { id: 'moon', label: 'III. From Apple to Moon' },
  { id: 'notebook', label: 'IV. The Mathematical Law' },
  { id: 'gravity-lab', label: 'V. Distance Experiment' },
  { id: 'mass-lab', label: 'VI. Mass Experiment' },
  { id: 'cosmic', label: 'VII. The Universal Law' },
  { id: 'timeline', label: 'VIII. Historical Timeline' },
  { id: 'myth-note', label: 'IX. The Legend Dissected' },
  { id: 'legacy', label: 'Epilogue: The Cosmic Legacy' },
];

export default function SideNav({ currentSection, onNavigate }: SideNavProps) {
  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 pointer-events-auto">
      <div className="flex flex-col items-center gap-2.5 p-2 rounded-full bg-[#FAF7F0]/80 backdrop-blur-md border border-[#DCD3C1]/80 shadow-md">
        {sections.map((section, idx) => {
          const isActive = currentSection === section.id;
          return (
            <div key={section.id} className="relative group flex items-center justify-center">
              <button
                onClick={() => onNavigate(section.id)}
                aria-label={section.label}
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-3.5 h-3.5 bg-[#B48325] scale-110 shadow-xs ring-2 ring-[#B48325]/30'
                    : 'w-2 h-2 bg-[#A89886] hover:bg-[#6B5E51] hover:scale-125'
                }`}
              />
              {/* Tooltip on left */}
              <div className="absolute right-6 px-2.5 py-1 rounded-md bg-[#24211E] text-[#F8F5EE] text-[11px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md z-50">
                <span className="font-serif italic mr-1 text-[#D4AF37]">
                  {idx === 0 ? '✦' : `${idx}.`}
                </span>
                {section.label}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
