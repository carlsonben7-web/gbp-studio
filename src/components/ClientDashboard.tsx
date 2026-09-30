import React, { useState } from 'react';
import { 
  FolderLock, Disc3, UploadCloud, Play, Pause, Download, Plus, MessageSquare, 
  CheckCircle2, Clock, Music, FileAudio, ShieldCheck, X, Volume2, Calendar,
  ArrowRight, ExternalLink, HardDrive, Filter, AlertCircle, FileText
} from 'lucide-react';
import { TrackFile, TrackNote, BookingSession } from '../types';

interface ClientDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'vault' | 'sessions' | 'upload'>('vault');
  const [selectedTrackId, setSelectedTrackId] = useState<string>('tr-1');
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState<number>(35);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTimestamp, setNewNoteTimestamp] = useState('01:24');

  // Simulated upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Initial client tracks
  const [tracks, setTracks] = useState<TrackFile[]>([
    {
      id: 'tr-1',
      title: 'Midnight in Georgia (Prism HD Master v2)',
      artist: 'Echo Horizon',
      version: 'v2.4 Final Master',
      duration: '04:18',
      sampleRate: '96.0 kHz',
      bitDepth: '24-Bit Linear',
      fileSize: '94.2 MB',
      status: 'Master Approved',
      uploadedAt: 'Sep 28, 2026',
      type: 'Master',
      notesCount: 3,
    },
    {
      id: 'tr-2',
      title: 'Midnight in Georgia (Vocal Stem)',
      artist: 'Echo Horizon',
      version: 'Stem A-01',
      duration: '04:18',
      sampleRate: '96.0 kHz',
      bitDepth: '24-Bit Linear',
      fileSize: '88.4 MB',
      status: 'Ready for Review',
      uploadedAt: 'Sep 27, 2026',
      type: 'Vocal Stem',
      notesCount: 1,
    },
    {
      id: 'tr-3',
      title: 'Resonance in A Minor (Analog Tape Sum)',
      artist: 'Glenn Brown Trio',
      version: 'Pre-Master Mixdown',
      duration: '05:42',
      sampleRate: '192.0 kHz',
      bitDepth: '24-Bit Linear',
      fileSize: '245.8 MB',
      status: 'In Mastering Chain',
      uploadedAt: 'Sep 25, 2026',
      type: 'Mixdown',
      notesCount: 2,
    },
    {
      id: 'tr-4',
      title: 'Roswell Acoustic Suite (Full Album DDP Image)',
      artist: 'Acoustic Chamber Collective',
      version: 'Red Book DDP + MD5',
      duration: '42:15',
      sampleRate: '44.1 kHz / 16-Bit',
      bitDepth: 'Red Book CD',
      fileSize: '412.0 MB',
      status: 'Delivered',
      uploadedAt: 'Sep 20, 2026',
      type: 'Master',
      notesCount: 0,
    },
  ]);

  // Initial track revision notes
  const [notes, setNotes] = useState<TrackNote[]>([
    {
      id: 'n-1',
      trackId: 'tr-1',
      timestamp: '01:14',
      author: 'Ben Lumley',
      role: 'Client',
      content: 'The vocal presence through the Prism converters here is breathtaking. Exactly the air we wanted.',
      resolved: true,
      createdAt: 'Sep 28, 10:14 AM',
    },
    {
      id: 'n-2',
      trackId: 'tr-1',
      timestamp: '02:45',
      author: 'Glenn Brown',
      role: 'Chief Engineer',
      content: 'Added +0.4dB tube warmth around 80Hz and touched the Manley variable-mu limiter. Notice the tight kick translation.',
      resolved: true,
      createdAt: 'Sep 28, 02:30 PM',
    },
    {
      id: 'n-3',
      trackId: 'tr-1',
      timestamp: '03:52',
      author: 'Ben Lumley',
      role: 'Client',
      content: 'Outro acoustic guitar decay into reverb tail is crystal clean with zero hiss. Master is approved for vinyl lacquer cutting!',
      resolved: false,
      createdAt: 'Sep 29, 09:05 AM',
    },
    {
      id: 'n-4',
      trackId: 'tr-2',
      timestamp: '00:32',
      author: 'Glenn Brown',
      role: 'Chief Engineer',
      content: 'De-essing on vocal stem verified on GBP custom soffit monitors. Ready for final summing.',
      resolved: false,
      createdAt: 'Sep 27, 04:15 PM',
    },
  ]);

  // Sample client sessions
  const [sessions] = useState<BookingSession[]>([
    {
      id: 'GBP-2026-892',
      clientName: 'Ben Lumley',
      clientEmail: 'benlumley89@gmail.com',
      clientPhone: '(770) 555-0194',
      serviceType: 'High-Definition Mastering',
      date: 'Oct 04, 2026',
      timeSlot: '01:00 PM - 05:00 PM EST',
      trackCount: 4,
      genre: 'Neo-Soul / Acoustic Jazz',
      notes: 'Final master passes for streaming and vinyl pre-master DDP delivery.',
      status: 'Confirmed',
      totalEstimate: 850,
    },
    {
      id: 'GBP-2026-871',
      clientName: 'Ben Lumley',
      clientEmail: 'benlumley89@gmail.com',
      clientPhone: '(770) 555-0194',
      serviceType: 'Live Tracking Lockout',
      date: 'Oct 18, 2026',
      timeSlot: '10:00 AM - 07:00 PM EST',
      trackCount: 2,
      genre: 'Acoustic Ensembles',
      notes: 'Full day lockout at 190 Spring Ridge Trce facility. Tracking grand piano and vintage tube mics.',
      status: 'Confirmed',
      totalEstimate: 1450,
    },
  ]);

  if (!isOpen) return null;

  const currentTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0];
  const currentNotes = notes.filter((n) => n.trackId === currentTrack.id);

  const handleTogglePlay = (trackId: string) => {
    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;

    const newNote: TrackNote = {
      id: `n-${Date.now()}`,
      trackId: currentTrack.id,
      timestamp: newNoteTimestamp || '00:00',
      author: 'Ben Lumley',
      role: 'Client',
      content: newNoteContent,
      resolved: false,
      createdAt: 'Just now',
    };

    setNotes([newNote, ...notes]);
    setTracks(
      tracks.map((t) =>
        t.id === currentTrack.id ? { ...t, notesCount: t.notesCount + 1 } : t
      )
    );
    setNewNoteContent('');
  };

  const handleToggleResolveNote = (noteId: string) => {
    setNotes(
      notes.map((n) => (n.id === noteId ? { ...n, resolved: !n.resolved } : n))
    );
  };

  const handleSimulateUpload = () => {
    if (!uploadFile) return;
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Add uploaded track to list
          const newTrack: TrackFile = {
            id: `tr-${Date.now()}`,
            title: uploadFile.name.replace(/\.[^/.]+$/, ''),
            artist: 'Ben Lumley',
            version: 'Raw Mix v1.0',
            duration: '03:45',
            sampleRate: '96.0 kHz',
            bitDepth: '24-Bit Linear',
            fileSize: `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB`,
            status: 'Ready for Review',
            uploadedAt: 'Today',
            type: 'Mixdown',
            notesCount: 0,
          };

          setTracks([newTrack, ...tracks]);
          setSelectedTrackId(newTrack.id);
          setUploadSuccessMessage(`Successfully uploaded "${uploadFile.name}" to Roswell Secure Vault!`);
          setTimeout(() => {
            setUploadSuccessMessage(null);
            setActiveTab('vault');
          }, 1500);

          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0e1217] border border-amber-500/30 rounded-xl w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-[#12161d] px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FolderLock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-base sm:text-lg tracking-wide">
                  CLIENT PORTAL & AUDIO VAULT
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  SECURE 24-BIT / 96k ARCHIVE
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Glenn Brown Productions LLC • Facility: 190 Spring Ridge Trce, Roswell, GA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 border border-slate-800 rounded px-3 py-1 bg-slate-900/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Client: <strong>Ben Lumley</strong></span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#0b0e12] px-6 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0 overflow-x-auto">
          <div className="flex space-x-1 sm:space-x-4">
            <button
              onClick={() => setActiveTab('vault')}
              className={`py-3 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'vault'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileAudio className="w-4 h-4" />
              <span>Track Files & Masters ({tracks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('sessions')}
              className={`py-3 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'sessions'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Booked Sessions ({sessions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`py-3 px-3 sm:px-4 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'upload'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Stems / Mixes</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono uppercase font-bold transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Book New Date</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#090b0e]">
          {/* TAB 1: TRACK VAULT & REVISION NOTES */}
          {activeTab === 'vault' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Track Files List */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
                  <span>ACTIVE RELEASES & STEM DELIVERABLES</span>
                  <span className="text-amber-400">{tracks.length} files secured</span>
                </div>

                <div className="space-y-2.5">
                  {tracks.map((track) => {
                    const isSelected = track.id === selectedTrackId;
                    const isTrackPlaying = playingTrackId === track.id;

                    return (
                      <div
                        key={track.id}
                        onClick={() => setSelectedTrackId(track.id)}
                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#141a22] border-amber-500/50 shadow-lg shadow-black/40'
                            : 'bg-[#0e1217] border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTogglePlay(track.id);
                              }}
                              className={`p-2.5 rounded-full transition-all shrink-0 cursor-pointer ${
                                isTrackPlaying
                                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                                  : 'bg-slate-800 hover:bg-amber-500/20 text-amber-400'
                              }`}
                            >
                              {isTrackPlaying ? (
                                <Pause className="w-4 h-4 fill-current" />
                              ) : (
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              )}
                            </button>

                            <div>
                              <h4 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                                <span>{track.title}</span>
                              </h4>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {track.artist} • <span className="font-mono text-amber-400/90">{track.version}</span>
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] font-mono text-slate-400">
                                <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                                  {track.sampleRate}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                                  {track.bitDepth}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                                  {track.fileSize}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${
                                track.status === 'Master Approved'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                  : track.status === 'In Mastering Chain'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {track.status}
                            </span>
                            <div className="text-[10px] font-mono text-slate-500 mt-2">
                              {track.notesCount} notes
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Track Inspector & Revision Notes */}
              <div className="lg:col-span-6 bg-[#0e1217] border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                        FILE INSPECTION & MASTER DELIVERY
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">{currentTrack.title}</h3>
                    </div>

                    <a
                      href="#download-sim"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Downloading uncompressed master "${currentTrack.title}" (${currentTrack.sampleRate}, ${currentTrack.fileSize}). Generated with Prism Sound Dream HD converters.`);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono uppercase font-semibold transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Master WAV</span>
                    </a>
                  </div>

                  {/* Simulated Waveform Display */}
                  <div className="mt-4 p-4 rounded bg-[#090b0e] border border-slate-800 relative">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                      <span>WAVEFORM TIMELINE</span>
                      <span className="text-amber-400">01:24 / {currentTrack.duration}</span>
                    </div>

                    {/* Waveform graphic with scrub bar */}
                    <div
                      className="h-16 flex items-center gap-0.5 sm:gap-1 cursor-pointer relative"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = ((e.clientX - rect.left) / rect.width) * 100;
                        setPlaybackProgress(Math.round(pct));
                      }}
                    >
                      {Array.from({ length: 42 }).map((_, idx) => {
                        const heightPct = Math.sin(idx * 0.35) * 40 + 45;
                        const isPast = (idx / 42) * 100 <= playbackProgress;
                        return (
                          <div
                            key={idx}
                            className={`flex-1 rounded-sm transition-all ${
                              isPast
                                ? 'bg-amber-400'
                                : 'bg-slate-700 hover:bg-slate-500'
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />
                        );
                      })}
                      {/* Playhead line */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-rose-500 shadow-md pointer-events-none"
                        style={{ left: `${playbackProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Revision Notes List */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-3">
                      <span className="font-bold flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-amber-400" />
                        <span>TIME-CODED MIX REVISIONS ({currentNotes.length})</span>
                      </span>
                      <span className="text-[10px] text-slate-500">Click circle to resolve</span>
                    </div>

                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {currentNotes.length === 0 ? (
                        <p className="text-xs text-slate-500 italic p-3 text-center bg-slate-900/40 rounded">
                          No revision notes yet for this track. Use the form below to submit notes for Glenn Brown.
                        </p>
                      ) : (
                        currentNotes.map((note) => (
                          <div
                            key={note.id}
                            className={`p-3 rounded border text-xs space-y-1 transition-all ${
                              note.resolved
                                ? 'bg-slate-900/30 border-slate-800 text-slate-500'
                                : 'bg-slate-900/90 border-slate-700/80 text-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleToggleResolveNote(note.id)}
                                  className={`p-0.5 rounded cursor-pointer ${
                                    note.resolved ? 'text-emerald-400' : 'text-slate-500 hover:text-white'
                                  }`}
                                  title="Mark as resolved"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 font-bold">
                                  {note.timestamp}
                                </span>
                                <span className="font-semibold text-slate-300">{note.author}</span>
                                <span className="text-[10px] text-slate-500">({note.role})</span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-500">{note.createdAt}</span>
                            </div>
                            <p className="pl-6 text-xs text-slate-300 font-light leading-relaxed">{note.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Add New Timestamped Note Form */}
                <form onSubmit={handleAddNote} className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="01:24"
                      value={newNoteTimestamp}
                      onChange={(e) => setNewNoteTimestamp(e.target.value)}
                      className="w-20 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="text"
                      placeholder="Add mix comment or mastering adjustment note..."
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase cursor-pointer"
                    >
                      Post Note
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKED SESSIONS */}
          {activeTab === 'sessions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">UPCOMING ROSWELL STUDIO SESSIONS</h3>
                  <p className="text-xs text-slate-400 font-mono">190 Spring Ridge Trce, Roswell, GA 30076</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase cursor-pointer shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Another Date</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-5 rounded-lg bg-[#0e1217] border border-amber-500/30 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                          SESSION ID: {session.id}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">{session.serviceType}</h4>
                        <span className="text-xs text-slate-400">Chief Engineer: Glenn Brown</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold uppercase">
                        {session.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono p-3 rounded bg-slate-900/80 border border-slate-800">
                      <div>
                        <span className="text-slate-500 block text-[10px]">DATE</span>
                        <span className="text-white font-semibold">{session.date}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">TIME WINDOW</span>
                        <span className="text-amber-400 font-semibold">{session.timeSlot}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">TRACK COUNT</span>
                        <span className="text-white">{session.trackCount} Songs / Stems</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">ESTIMATED TOTAL</span>
                        <span className="text-emerald-400 font-bold">${session.totalEstimate} USD</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 font-light italic">
                      Notes: &ldquo;{session.notes}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                      <span>Facility Keycard Access Assigned</span>
                      <span className="text-amber-400">Roswell Facility Suite A</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DIRECT STEM & MIX UPLOAD */}
          {activeTab === 'upload' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-white">SUBMIT MIXDOWNS OR TRACK STEMS</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Upload high-resolution 24-bit or 32-bit float WAV/AIFF audio files directly to our Roswell control room storage server.
                </p>
              </div>

              {uploadSuccessMessage && (
                <div className="p-3.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{uploadSuccessMessage}</span>
                </div>
              )}

              {/* Upload Dropzone */}
              <div className="p-8 rounded-xl border-2 border-dashed border-amber-500/40 hover:border-amber-400 bg-[#0e1217] transition-all text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <UploadCloud className="w-7 h-7" />
                </div>

                <div>
                  <label className="inline-block px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider cursor-pointer shadow-lg">
                    <span>Select Audio File</span>
                    <input
                      type="file"
                      accept=".wav,.aif,.aiff,.flac,.zip"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                  <p className="text-xs text-slate-400 mt-2">
                    or drag and drop 24-bit WAV / AIFF files here
                  </p>
                </div>

                {uploadFile && (
                  <div className="p-3 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-left flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">{uploadFile.name}</span>
                      <span className="text-slate-400 text-[10px]">
                        {(uploadFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for ingestion
                      </span>
                    </div>
                    <button
                      onClick={handleSimulateUpload}
                      disabled={isUploading}
                      className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono uppercase cursor-pointer disabled:opacity-50"
                    >
                      {isUploading ? `Uploading ${uploadProgress}%` : 'Start Ingest'}
                    </button>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-1.5">
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-amber-400">
                      Uploading to Prism Sound Storage Engine... {uploadProgress}%
                    </span>
                  </div>
                )}
              </div>

              {/* Delivery Guidelines */}
              <div className="p-4 rounded-lg bg-[#0e1217] border border-slate-800 text-xs space-y-2">
                <span className="font-mono text-amber-400 font-bold block uppercase text-[11px]">
                  PRISTINE MIXDOWN SUBMISSION GUIDELINES:
                </span>
                <ul className="space-y-1.5 text-slate-300 font-light">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Headroom:</strong> Leave 3dB to 6dB of peak headroom on master bus.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>No Brickwall Limiters:</strong> Bypass any master output clipping or brickwall limiters.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>Sample Rate:</strong> Export at native tracking resolution (do not upsample).</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
