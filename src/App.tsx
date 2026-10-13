/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation, NavTab } from './components/Navigation.tsx';
import { ChatSection } from './components/ChatSection.tsx';
import { BreathingGuide } from './components/BreathingGuide.tsx';
import { AffirmationCards } from './components/AffirmationCards.tsx';
import { SelfCareJournal } from './components/SelfCareJournal.tsx';
import { SafeResources } from './components/SafeResources.tsx';
import { Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('chat');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2825]">
      {/* Top Bar Navigation */}
      <Navigation currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'chat' && <ChatSection />}
        {currentTab === 'breathing' && <BreathingGuide />}
        {currentTab === 'cards' && <AffirmationCards />}
        {currentTab === 'journal' && <SelfCareJournal />}
        {currentTab === 'safe' && <SafeResources />}
      </main>

      {/* Quiet Clean Footer */}
      <footer className="border-t border-[#EAE0CB] bg-[#F5EFE4]/80 py-6 px-4 text-center text-xs text-[#8A796A]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[#5C4A3A] font-medium">
            <Heart className="w-3.5 h-3.5 text-[#C16238]" />
            <span>다독임 — 차별받은 마음을 감싸 안는 당신만의 안식처</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#8A796A]">
            <span>언제든 24시간 청소년 무료 상담: 1388</span>
            <span>·</span>
            <span>너는 혼자가 아니야</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
