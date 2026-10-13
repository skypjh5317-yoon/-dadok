import React, { useState } from 'react';
import { Volume2, VolumeX, HeartHandshake } from 'lucide-react';
import { ambientSound } from '../utils/audioSynth.ts';

export type NavTab = 'chat' | 'breathing' | 'cards' | 'journal' | 'safe';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onSelectTab }) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [soundType, setSoundType] = useState<'rain' | 'campfire' | 'breeze'>('rain');
  const [soundMenuOpen, setSoundMenuOpen] = useState(false);

  const toggleSound = () => {
    if (isPlayingSound) {
      ambientSound.stop();
      setIsPlayingSound(false);
    } else {
      ambientSound.play(soundType, 0.2);
      setIsPlayingSound(true);
    }
  };

  const changeSoundType = (type: 'rain' | 'campfire' | 'breeze') => {
    setSoundType(type);
    if (isPlayingSound) {
      ambientSound.play(type, 0.2);
    }
    setSoundMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectTab('chat')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-[#936440] text-white flex items-center justify-center shadow-xs">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-[#2D241E]">
              다독임
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-[#8A7969] font-normal">
              상처받은 마음을 위한 쉼터
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-4 text-xs sm:text-sm font-medium text-[#736353]">
          <button
            onClick={() => onSelectTab('chat')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'chat'
                ? 'bg-[#EFE7D8] text-[#3D2C1E] font-semibold'
                : 'hover:text-[#2D241E] hover:bg-[#F3EDE2]'
            }`}
          >
            따뜻한 대화
          </button>
          <button
            onClick={() => onSelectTab('breathing')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'breathing'
                ? 'bg-[#EFE7D8] text-[#3D2C1E] font-semibold'
                : 'hover:text-[#2D241E] hover:bg-[#F3EDE2]'
            }`}
          >
            마음 안정 호흡
          </button>
          <button
            onClick={() => onSelectTab('cards')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'cards'
                ? 'bg-[#EFE7D8] text-[#3D2C1E] font-semibold'
                : 'hover:text-[#2D241E] hover:bg-[#F3EDE2]'
            }`}
          >
            위로의 편지
          </button>
          <button
            onClick={() => onSelectTab('journal')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'journal'
                ? 'bg-[#EFE7D8] text-[#3D2C1E] font-semibold'
                : 'hover:text-[#2D241E] hover:bg-[#F3EDE2]'
            }`}
          >
            행복 기록장
          </button>
          <button
            onClick={() => onSelectTab('safe')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'safe'
                ? 'bg-[#EFE7D8] text-[#3D2C1E] font-semibold'
                : 'hover:text-[#2D241E] hover:bg-[#F3EDE2]'
            }`}
          >
            안심 상담처
          </button>
        </nav>

        {/* Zone 3: 1 Primary Functional Action (Ambient Sound) */}
        <div className="relative shrink-0 flex items-center gap-1.5">
          <button
            onClick={toggleSound}
            title={isPlayingSound ? '마음 쉼 소리 끄기' : '마음 쉼 소리 켜기'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
              isPlayingSound
                ? 'bg-[#7D5333] text-white border-[#7D5333]'
                : 'bg-white text-[#5E4F42] border-[#E2D6C0] hover:bg-[#FAF4EB]'
            }`}
          >
            {isPlayingSound ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>
                  {soundType === 'rain' ? '빗소리' : soundType === 'campfire' ? '모닥불' : '포근한 바람'}
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#9E8B7A]" />
                <span className="hidden sm:inline">차분한 소리</span>
              </>
            )}
          </button>

          <button
            onClick={() => setSoundMenuOpen(!soundMenuOpen)}
            className="p-1.5 rounded-lg text-xs text-[#7A6B5D] hover:bg-[#EFE7D8] transition-colors"
            title="소리 변경"
          >
            ▾
          </button>

          {soundMenuOpen && (
            <div className="absolute right-0 top-10 mt-1 w-36 bg-white rounded-xl shadow-md border border-[#E6DCBE] py-1 text-xs text-[#44382F] z-50">
              <button
                onClick={() => changeSoundType('rain')}
                className={`w-full text-left px-3 py-2 hover:bg-[#FAF5ED] flex items-center justify-between ${
                  soundType === 'rain' ? 'font-semibold text-[#8B5E3C]' : ''
                }`}
              >
                <span>차분한 빗소리</span>
                {soundType === 'rain' && <span className="text-[#8B5E3C]">✓</span>}
              </button>
              <button
                onClick={() => changeSoundType('campfire')}
                className={`w-full text-left px-3 py-2 hover:bg-[#FAF5ED] flex items-center justify-between ${
                  soundType === 'campfire' ? 'font-semibold text-[#8B5E3C]' : ''
                }`}
              >
                <span>따뜻한 모닥불</span>
                {soundType === 'campfire' && <span className="text-[#8B5E3C]">✓</span>}
              </button>
              <button
                onClick={() => changeSoundType('breeze')}
                className={`w-full text-left px-3 py-2 hover:bg-[#FAF5ED] flex items-center justify-between ${
                  soundType === 'breeze' ? 'font-semibold text-[#8B5E3C]' : ''
                }`}
              >
                <span>포근한 바람</span>
                {soundType === 'breeze' && <span className="text-[#8B5E3C]">✓</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
