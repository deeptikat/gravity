import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Compass, BookOpen, RotateCcw } from 'lucide-react';
import { toggleAudio, getIsAudioEnabled } from '../utils/audio';

interface NavigationProps {
  currentSection: string;
  scrollProgress: number;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ currentSection, scrollProgress, onNavigate }: NavigationProps) {
  const [audioActive, setAudioActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setAudioActive(getIsAudioEnabled());
  }, []);

  const handleAudioToggle = () => {
    const newState = toggleAudio();
    setAudioActive(newState);
  };

  const navItems = [
    { id: 'hero', label: 'Prologue' },
    { id: 'orchard', label: 'I. The Orchard' },
    { id: 'question', label: 'II. Newton’s Question' },
    { id: 'moon', label: 'III. The Moon’s Fall' },
    { id: 'notebook', label: 'IV. The Notebook' },
    { id: 'gravity-lab', label: 'V. Distance and Gravity' },
    { id: 'mass-lab', label: 'VI. Mutual Attraction' },
    { id: 'cosmic', label: 'VII. Cosmic Law' },
    { id: 'timeline', label: 'VIII. Timeline' },
    { id: 'myth-note', label: 'IX. The Legend' },
    { id: 'legacy', label: 'Epilogue' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
      {/* Scroll progress indicator */}
      <div className="w-full h-1 bg-[#24211e]/10">
        <div
          className="h-full bg-[#102A43] transition-all duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Emblem & Title */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate('hero')}
            className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#FAF7F0]/90 backdrop-blur-md border border-[#DCD3C1] shadow-xs hover:border-[#B48325]/50 transition-all"
            title="Return to beginning"
          >
            <span className="w-5 h-5 rounded-full bg-[#B48325]/15 border border-[#B48325]/40 flex items-center justify-center text-[#8C6218] text-xs font-serif font-bold">
              🍎
            </span>
            <span className="font-heading text-xs tracking-widest uppercase font-semibold text-[#3A332C]">
              PHILOSOPHIÆ NATURALIS
            </span>
          </button>

          {/* Current chapter pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0]/70 backdrop-blur-md border border-[#E3DCce] text-xs text-[#6B5E51]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B48325] animate-pulse" />
            <span className="font-serif italic capitalize">
              {currentSection.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Right: Sound toggle & Chapters menu */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Quick jump to Interactive Labs */}
          <button
            onClick={() => onNavigate('gravity-lab')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F0]/80 backdrop-blur-md border border-[#DCD3C1] text-xs text-[#4A4036] hover:bg-[#FAF7F0] hover:text-[#8C6218] transition-all shadow-xs"
          >
            <Compass className="w-3.5 h-3.5 text-[#B48325]" />
            <span>Interactive Labs</span>
          </button>

          {/* Audio toggle button */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border backdrop-blur-md transition-all shadow-xs ${
              audioActive
                ? 'bg-[#B48325]/15 border-[#B48325]/50 text-[#8C6218]'
                : 'bg-[#FAF7F0]/80 border-[#DCD3C1] text-[#6B5E51] hover:text-[#24211E]'
            }`}
            title={audioActive ? 'Mute exhibition sound' : 'Enable ambient sound'}
            aria-label="Toggle ambient exhibition sound"
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Chapters Dropdown / Navigation menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#24211E] text-[#F8F5EE] hover:bg-[#3A332C] transition-all shadow-sm text-xs font-medium"
              aria-label="Story chapters"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Exhibition Chapters</span>
              <span className="sm:hidden">Chapters</span>
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 p-2 bg-[#FAF7F0] rounded-xl border border-[#DCD3C1] shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-[#E8E1D3] mb-1">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8C6218]">
                      Exhibit Directory
                    </p>
                    <p className="text-xs font-serif italic text-[#6B5E51]">
                      Follow Newton’s train of thought
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-0.5">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          setMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          currentSection === item.id
                            ? 'bg-[#B48325]/15 text-[#8C6218] font-semibold'
                            : 'text-[#4A4036] hover:bg-[#EFE9DC]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {currentSection === item.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B48325]" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 mt-1 border-t border-[#E8E1D3]">
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-[#8C6218] hover:text-[#5F430E] font-medium"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Back to Prologue</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
