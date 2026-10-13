import React, { useState } from 'react';
import { Sparkles, RefreshCw, Heart, Bookmark, Copy, Check } from 'lucide-react';

interface CardData {
  id: number;
  category: string;
  title: string;
  message: string;
  quote: string;
  bgGradient: string;
}

const CARDS_POOL: CardData[] = [
  {
    id: 1,
    category: '자존감 회복',
    title: '너라는 꽃은 너만의 계절에 피어난다',
    message: '남들과 다르다고 해서 뒤처진 것도, 모난 것도 아니에요. 각자의 계절에 피어나는 꽃처럼, 당신만의 고유한 빛깔은 이 세상에서 단 하나뿐인 귀한 아름다움입니다. 다른 사람들의 편견 어린 잣대에 스스로를 억지로 맞추지 않아도 괜찮아요.',
    quote: '너의 존재는 그 자체로 이미 완전한 기적이야.',
    bgGradient: 'from-[#FDF7F0] to-[#F5EADB]'
  },
  {
    id: 2,
    category: '무과실 확언',
    title: '차별은 절대로 너의 잘못이 아니다',
    message: '어떤 사람이 너에게 차가운 시선을 보냈거나 부당하게 대했다면, 그건 그 사람의 마음속 편협함과 무지가 드러난 것일 뿐입니다. 너에게 문제가 있어서 일어난 일이 결코 아니에요. 자책이라는 무거운 짐을 지금 내려놓아도 돼요.',
    quote: '상처 준 사람의 잘못을 내 탓으로 돌리지 않기.',
    bgGradient: 'from-[#FDF2ED] to-[#F6E1D7]'
  },
  {
    id: 3,
    category: '희망과 용기',
    title: '좁은 교실 바깥에 넓은 세상이 있어',
    message: '지금 마주한 학교의 교실이나 무리가 너의 온 세상처럼 느껴지겠지만, 세상은 훨씬 넓고 너의 진심과 다정함을 진정으로 아껴줄 따뜻한 사람들이 수없이 많아요. 이 계절을 잘 버텨낸 너는 훨씬 더 따뜻하고 단단한 어른이 될 거야.',
    quote: '너의 세상은 이제 막 시작되었고, 점점 더 눈부셔질 거야.',
    bgGradient: 'from-[#F3F7FA] to-[#DFEAF2]'
  },
  {
    id: 4,
    category: '마음의 평화',
    title: '눈물이 흐를 때는 억지로 참지 않아도 돼',
    message: '서럽고 억울해서 눈물이 쏟아질 때가 있어요. 그 눈물은 네가 나약해서가 아니라, 네 마음에 품은 상처를 씻어내기 위한 다정한 치유의 과정입니다. 울고 싶은 만큼 울고 나면, 마음속에 맑은 새싹이 돋아날 거예요.',
    quote: '울어도 괜찮아. 내가 언제나 네 곁에 있어 줄게.',
    bgGradient: 'from-[#F7F4FD] to-[#EBE4F6]'
  },
  {
    id: 5,
    category: '고유한 가치',
    title: '너의 다정함은 최고의 용기야',
    message: '상처를 받고도 남을 미워하는 대신 아파할 줄 아는 너의 마음은 참으로 깊고 따뜻합니다. 그 다정함을 부끄러워하지 마세요. 거칠고 모난 세상에서 다정함을 잃지 않는 것만큼 용기 있는 일은 없으니까요.',
    quote: '다정한 너의 마음이 결국 세상을 더 따뜻하게 바꿀 거야.',
    bgGradient: 'from-[#F4F9F2] to-[#E2F0DC]'
  }
];

export const AffirmationCards: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [savedCardIds, setSavedCardIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('dadokim_saved_cards');
      return stored ? JSON.parse(stored) : [1];
    } catch {
      return [1];
    }
  });
  const [copied, setCopied] = useState(false);

  const currentCard = CARDS_POOL[currentCardIndex];
  const isSaved = savedCardIds.includes(currentCard.id);

  const drawNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % CARDS_POOL.length);
    setCopied(false);
  };

  const toggleSaveCard = (cardId: number) => {
    const updated = isSaved
      ? savedCardIds.filter((id) => id !== cardId)
      : [...savedCardIds, cardId];
    setSavedCardIds(updated);
    try {
      localStorage.setItem('dadokim_saved_cards', JSON.stringify(updated));
    } catch {
      // Ignored
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${currentCard.quote}" - ${currentCard.title}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      {/* Visual Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-8 border border-[#E8DEC9] shadow-xs">
        <img
          src="/src/assets/images/comfort_warm_sunrise_1791861084848.jpg"
          alt="따뜻한 아침 햇살과 벚꽃 언덕"
          referrerPolicy="no-referrer"
          className="w-full h-48 sm:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <span className="text-xs font-semibold text-[#FBE3B5] uppercase tracking-wider mb-1">
            마음 비타민 우체통
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            차별의 그늘을 걷어내는 따뜻한 햇살 편지
          </h2>
          <p className="text-xs sm:text-sm text-[#F0E6D8] mt-1 max-w-xl">
            가장 어두운 새벽을 건너고 있는 너에게, 네 마음을 따스하게 감싸 안아줄 진심 어린 글귀들을 전합니다.
          </p>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DEC8] shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="text-xs font-semibold text-[#8B5E3C] bg-[#FAF2E6] px-3 py-1 rounded-full border border-[#E9DEC8]">
            {currentCard.category}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveCard(currentCard.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                isSaved
                  ? 'bg-[#C16238] text-white border-[#C16238]'
                  : 'bg-white text-[#6F5D4C] border-[#E2D5BF] hover:bg-[#FAF5ED]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? '간직됨' : '마음에 간직하기'}</span>
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-xl border border-[#E2D5BF] text-[#6F5D4C] hover:bg-[#FAF5ED] transition-colors"
              title="문구 복사"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${currentCard.bgGradient} border border-[#E8DEC9] my-4`}>
          <h3 className="text-xl sm:text-2xl font-bold text-[#3B2C20] mb-3">
            {currentCard.title}
          </h3>
          <p className="text-sm sm:text-base text-[#4F3E30] leading-relaxed mb-6 whitespace-pre-line">
            {currentCard.message}
          </p>
          <div className="pt-4 border-t border-[#DFD1BD]/60 flex items-center gap-2 text-[#7A4B29] font-semibold text-sm sm:text-base italic">
            <Heart className="w-4 h-4 shrink-0 text-[#C16238]" />
            <span>"{currentCard.quote}"</span>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#8A7969]">
            총 {CARDS_POOL.length}개의 위로 중 <strong className="text-[#3B2C20]">{currentCardIndex + 1}번째</strong> 카드
          </span>
          <button
            onClick={drawNextCard}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5E3C] hover:bg-[#744D30] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span>다른 위로 카드 뽑기</span>
          </button>
        </div>
      </div>

      {/* Bookmarked Collection preview */}
      {savedCardIds.length > 0 && (
        <div className="mt-8 bg-white/80 rounded-2xl p-6 border border-[#E7DEC8]">
          <h4 className="text-sm font-bold text-[#3B2C20] flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#8B5E3C]" />
            내가 마음에 간직한 위로의 말 ({savedCardIds.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CARDS_POOL.filter((c) => savedCardIds.includes(c.id)).map((card) => (
              <div
                key={card.id}
                onClick={() => setCurrentCardIndex(CARDS_POOL.findIndex((c) => c.id === card.id))}
                className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DEC9] hover:border-[#8B5E3C] cursor-pointer transition-all"
              >
                <div className="text-xs font-semibold text-[#8B5E3C] mb-1">{card.title}</div>
                <div className="text-xs text-[#5C4A3A] line-clamp-2 italic">"{card.quote}"</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
