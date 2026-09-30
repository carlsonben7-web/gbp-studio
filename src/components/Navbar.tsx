import React, { useState, useEffect } from 'react';
import { Volume2, Disc, Shield, Sliders, Calendar, FolderLock, Menu, X, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenVault: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenVault }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Studio & Tracking', href: '#studio-tracking' },
    { name: 'HD Mastering', href: '#mastering' },
    { name: 'Acoustic Architecture', href: '#acoustic-design' },
    { name: 'The Heritage', href: '#founder' },
    { name: 'Room Calculator', href: '#room-calculator' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0f12]/95 backdrop-blur-md border-b border-amber-500/15 py-3 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-[#0b0d10]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/40 flex items-center justify-center relative overflow-hidden group-hover:border-amber-400 transition-colors">
              <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="font-display font-bold text-amber-400 text-lg tracking-wider">GBP</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-white tracking-wider text-sm sm:text-base group-hover:text-amber-300 transition-colors">
                  GLENN BROWN PRODUCTIONS
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 hidden md:inline-block">
                  LLC
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3 h-3 text-amber-500/70" />
                <span className="text-[11px] font-mono tracking-tight text-slate-400">Roswell, GA • 190 Spring Ridge Trce</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest font-mono text-slate-300 hover:text-amber-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions: Client Vault & Book Session */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenVault}
              className="flex items-center gap-2 px-3.5 py-2 rounded-sm border border-slate-700 bg-slate-900/60 hover:bg-slate-800/80 text-xs font-mono uppercase tracking-wider text-slate-200 hover:text-white hover:border-slate-500 transition-all cursor-pointer shadow-inner"
              title="Client Stems & Master Vault"
            >
              <FolderLock className="w-3.5 h-3.5 text-amber-400" />
              <span>Client Vault</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 rounded-sm bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-amber-600/20 active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-950" />
              <span>Book Session</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenVault}
              className="p-2 rounded border border-slate-700 bg-slate-900 text-amber-400 text-xs font-mono sm:hidden"
              title="Client Vault"
            >
              <FolderLock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0f12] border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="py-2 border-b border-slate-800">
            <p className="text-[11px] font-mono text-slate-400">Glenn Brown Productions LLC</p>
            <p className="text-xs text-amber-400 font-mono">190 spring ridge trce, Roswell, GA 30076</p>
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase font-mono tracking-wider text-slate-300 hover:text-amber-400 py-2 border-b border-slate-800/60"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVault();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded border border-slate-700 bg-slate-900 text-slate-200 text-xs font-mono uppercase tracking-wider"
            >
              <FolderLock className="w-4 h-4 text-amber-400" />
              <span>Open Client Track Vault</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Session / Consult</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
