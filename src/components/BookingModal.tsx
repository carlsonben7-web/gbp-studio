import React, { useState } from 'react';
import { Calendar, Clock, Disc, Mic2, Wrench, X, CheckCircle, ShieldCheck, DollarSign } from 'lucide-react';
import { BookingSession } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: 'Live Tracking Lockout' | 'High-Definition Mastering' | 'Acoustic Architecture Consultation' | 'Stem Mix & Master Package';
  onBookingComplete?: (session: BookingSession) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'High-Definition Mastering',
  onBookingComplete,
}) => {
  const [service, setService] = useState<'Live Tracking Lockout' | 'High-Definition Mastering' | 'Acoustic Architecture Consultation' | 'Stem Mix & Master Package'>(defaultService);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-10-12');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 03:00 PM EST');
  const [trackCount, setTrackCount] = useState(3);
  const [genre, setGenre] = useState('Rock / Acoustic');
  const [notes, setNotes] = useState('');
  const [confirmedSession, setConfirmedSession] = useState<BookingSession | null>(null);

  if (!isOpen) return null;

  // Rate calculation
  const calculateTotal = () => {
    switch (service) {
      case 'Live Tracking Lockout':
        return 1450;
      case 'High-Definition Mastering':
        return trackCount * 125;
      case 'Stem Mix & Master Package':
        return trackCount * 320;
      case 'Acoustic Architecture Consultation':
        return 650;
      default:
        return 500;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking: BookingSession = {
      id: `GBP-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: name || 'Valued Client',
      clientEmail: email || 'client@studio.com',
      clientPhone: phone || '(770) 555-0194',
      serviceType: service,
      date,
      timeSlot,
      trackCount,
      genre,
      notes,
      status: 'Confirmed',
      totalEstimate: calculateTotal(),
    };

    setConfirmedSession(newBooking);
    if (onBookingComplete) onBookingComplete(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0e1217] border border-amber-500/30 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#12161d] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">SCHEDULE SESSION CONSULTATION</h3>
              <p className="text-xs font-mono text-slate-400">190 Spring Ridge Trce, Roswell, GA 30076</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {confirmedSession ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                RESERVATION CONFIRMED • ID: {confirmedSession.id}
              </span>
              <h4 className="text-xl font-bold text-white mt-1">Session Booked with Glenn Brown</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                A confirmation receipt with session preparation notes, control room access directions, and secure stem upload links has been generated.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="text-amber-300 font-bold">{confirmedSession.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Window:</span>
                <span className="text-white">{confirmedSession.date} ({confirmedSession.timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Studio Location:</span>
                <span className="text-white">190 spring ridge trce, Roswell, GA</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 font-bold">
                <span className="text-slate-300">Estimated Project Fee:</span>
                <span className="text-emerald-400 text-sm">${confirmedSession.totalEstimate} USD</span>
              </div>
            </div>

            <div className="pt-3 flex gap-3 justify-center">
              <button
                onClick={() => {
                  setConfirmedSession(null);
                  onClose();
                }}
                className="px-6 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Service selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Select Discipline / Service:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { id: 'High-Definition Mastering', label: 'HD Mastering (Prism Sound)', icon: Disc },
                  { id: 'Live Tracking Lockout', label: 'Studio Tracking Lockout', icon: Mic2 },
                  { id: 'Stem Mix & Master Package', label: 'Multi-Stem Mix & Master', icon: Disc },
                  { id: 'Acoustic Architecture Consultation', label: 'Acoustic Design / Room Tuning', icon: Wrench },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = service === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setService(item.id as typeof service)}
                      className={`p-3 rounded border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500/70 text-amber-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0 text-amber-400" />
                      <span className="font-semibold text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Client info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Artist / Client Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ben Lumley"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="benlumley89@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(770) 555-0194"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Tracks / Stems Count
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={trackCount}
                  onChange={(e) => setTrackCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Project Genre & Technical Notes
              </label>
              <textarea
                rows={2}
                placeholder="Specific audio goals, reference tracks, or acoustic requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Total summary */}
            <div className="p-3.5 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Estimated Session Investment:</span>
              <span className="text-emerald-400 font-bold text-sm">${calculateTotal()} USD</span>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-slate-700 text-slate-400 hover:text-white text-xs font-mono uppercase cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Confirm & Book Session
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
