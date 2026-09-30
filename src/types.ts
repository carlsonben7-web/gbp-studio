export interface TrackFile {
  id: string;
  title: string;
  artist: string;
  version: string;
  duration: string;
  sampleRate: string;
  bitDepth: string;
  fileSize: string;
  status: 'Ready for Review' | 'In Mastering Chain' | 'Master Approved' | 'Delivered';
  uploadedAt: string;
  type: 'Master' | 'Mixdown' | 'Vocal Stem' | 'Drum Stem' | 'Instrumental';
  notesCount: number;
}

export interface TrackNote {
  id: string;
  trackId: string;
  timestamp: string; // e.g. "01:42"
  author: string;
  role: 'Client' | 'Chief Engineer';
  content: string;
  resolved: boolean;
  createdAt: string;
}

export interface BookingSession {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceType: 'Live Tracking Lockout' | 'High-Definition Mastering' | 'Acoustic Architecture Consultation' | 'Stem Mix & Master Package';
  date: string;
  timeSlot: string;
  trackCount: number;
  genre: string;
  notes: string;
  status: 'Confirmed' | 'Pending Review' | 'Completed';
  totalEstimate: number;
}

export interface StudioGearItem {
  name: string;
  category: 'Conversion' | 'Monitoring' | 'Outboard Dynamics' | 'Microphones' | 'Acoustics';
  description: string;
  highlight: string;
}
