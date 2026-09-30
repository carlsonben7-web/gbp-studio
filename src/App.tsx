/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FounderBio } from './components/FounderBio';
import { StudioServices } from './components/StudioServices';
import { RoomModeCalculator } from './components/RoomModeCalculator';
import { Footer } from './components/Footer';
import { ClientDashboard } from './components/ClientDashboard';
import { BookingModal } from './components/BookingModal';
import { BookingSession } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [selectedBookingService, setSelectedBookingService] = useState<
    'Live Tracking Lockout' | 'High-Definition Mastering' | 'Acoustic Architecture Consultation' | 'Stem Mix & Master Package'
  >('High-Definition Mastering');

  const handleOpenBookingWithService = (
    service: 'Live Tracking Lockout' | 'High-Definition Mastering' | 'Acoustic Architecture Consultation'
  ) => {
    setSelectedBookingService(service);
    setIsBookingOpen(true);
  };

  const handleBookingCompleted = (session: BookingSession) => {
    // Optionally alert or switch to vault
    console.log('Booked session:', session);
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#e2e8f0] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => {
          setSelectedBookingService('High-Definition Mastering');
          setIsBookingOpen(true);
        }}
        onOpenVault={() => setIsVaultOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section with Live A/B Console */}
        <Hero
          onOpenBooking={() => {
            setSelectedBookingService('High-Definition Mastering');
            setIsBookingOpen(true);
          }}
          onOpenVault={() => setIsVaultOpen(true)}
        />

        {/* Section 2: Founder & Chief Engineer Profile */}
        <FounderBio />

        {/* Section 3: Core Specialization Chunks */}
        <StudioServices onOpenBookingWithService={handleOpenBookingWithService} />

        {/* Section 4: Interactive Room Mode & Acoustic Resonance Calculator */}
        <RoomModeCalculator />
      </main>

      {/* Section 5: Footer & Conversion Desk */}
      <Footer
        onOpenBooking={() => {
          setSelectedBookingService('High-Definition Mastering');
          setIsBookingOpen(true);
        }}
        onOpenVault={() => setIsVaultOpen(true)}
      />

      {/* Interactive Modals */}
      <ClientDashboard
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onOpenBooking={() => {
          setIsVaultOpen(false);
          setIsBookingOpen(true);
        }}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={selectedBookingService}
        onBookingComplete={handleBookingCompleted}
      />
    </div>
  );
}
