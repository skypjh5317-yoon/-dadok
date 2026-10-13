import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Heart, Sparkles } from 'lucide-react';

type BreathStage = 'inhale' | 'hold1' | 'exhale' | 'hold2';

const STAGE_CONFIG: Record<
  BreathStage,
  { label: string; subtext: string; next: BreathStage; duration: number; circleScale: string }
> = {
  inhale: {
    label: '천천히 들이마시기',
    subtext: '가슴 깊이 맑고 따뜻한 온기가 차오릅니다',
    next: 'hold1',
    duration: 4,
    circleScale: 'scale-125 bg-[#F4DFCC]',
  },
  hold1: {
    label: '가만히 머금기',
    subtext: '따뜻한 온기가 마음속 구석구석 퍼져나갑니다',
    next: 'exhale',
    duration: 4,
    circleScale: 'scale-125 bg-[#EEDBBD]',
  },
  exhale: {
    label: '조용히 내쉬기',
    subtext: '서럽고 답답했던 모든 상처와 긴장을 밖으로 흘려보냅니다',
    next: 'hold2',
    duration: 4,
    circleScale: 'scale-90 bg-[#E8DDD0]',
  },
  hold2: {
    label: '편안하게 비우기',
    subtext: '마음이 고요하고 평온한 상태로 머뭅니다',
    next: 'inhale',
    duration: 4,
    circleScale: 'scale-90 bg-[#F1E9DE]',
  },
};

export const BreathingGuide: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [stage, setStage] = useState<BreathStage>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            const nextStage = STAGE_CONFIG[stage].next;
            setStage(nextStage);
            if (nextStage === 'inhale') {
              setCycleCount((c) => c + 1);
            }
            return STAGE_CONFIG[nextStage].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, stage]);

  const toggleBreathing = () => {
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setStage('inhale');
    setSecondsLeft(4);
    setCycleCount(0);
  };

  const currentConfig = STAGE_CONFIG[stage];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Header Info */}
      <div className="text-center mb-8 max-w-lg">
        <span className="text-xs font-semibold text-[#8B5E3C] bg-[#F5EDE1] px-3 py-1 rounded-full border border-[#E7DAC3]">
          4-4-4-4 마인드풀 박스 호흡
        </span>
        <h2 className="text-2xl font-bold text-[#2D231A] mt-3">
          가슴이 답답하고 떨릴 때, 잠시 숨고르기
        </h2>
        <p className="text-sm text-[#776657] mt-2 leading-relaxed">
          차별이나 차가운 말로 인해 심장이 쿵쾅거리고 눈물이 날 때,
          호흡의 리듬에 맞춰 몸과 마음의 긴장을 부드럽게 풀어주세요.
        </p>
      </div>

      {/* Interactive Breath Circle Visualizer */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-4">
        {/* Outer Gentle Halo */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out border-2 border-dashed border-[#DBCAB0] ${
            isActive ? 'animate-spin-slow opacity-60' : 'opacity-30'
          }`}
          style={{ animationDuration: '24s' }}
        />

        {/* Pulsing Core Circle */}
        <div
          className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full flex flex-col items-center justify-center text-center p-6 transition-all duration-3000 ease-in-out shadow-inner border border-[#E1D1B9] ${
            currentConfig.circleScale
          }`}
        >
          <span className="text-3xl font-extrabold text-[#3B2C20] tabular-nums mb-1">
            {secondsLeft}초
          </span>
          <span className="text-base font-bold text-[#553E2D]">
            {currentConfig.label}
          </span>
          <span className="text-xs text-[#7F6B58] mt-2 px-3 leading-snug">
            {currentConfig.subtext}
          </span>
        </div>
      </div>

      {/* Cycle counter */}
      <div className="flex items-center gap-2 text-xs text-[#8A7969] mb-6">
        <Heart className="w-4 h-4 text-[#C16238]" />
        <span>완료한 호흡 사이클: <strong className="text-[#3B2C20]">{cycleCount}회</strong></span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleBreathing}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs ${
            isActive
              ? 'bg-[#C85A32] hover:bg-[#B04C27] text-white'
              : 'bg-[#8B5E3C] hover:bg-[#744D30] text-white'
          }`}
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" />
              <span>잠시 멈추기</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>호흡 시작하기</span>
            </>
          )}
        </button>

        <button
          onClick={resetBreathing}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#D9CDB6] text-xs font-medium text-[#5E4E40] hover:bg-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>처음으로</span>
        </button>
      </div>

      {/* Gentle Tips */}
      <div className="mt-12 w-full max-w-xl bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-[#E8DEC9]">
        <h3 className="text-sm font-bold text-[#3B2C20] flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#8B5E3C]" />
          호흡을 하며 기억해주세요
        </h3>
        <ul className="text-xs text-[#6F5F51] space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#8B5E3C] font-bold">·</span>
            <span>누군가의 부당한 평가나 행동은 결코 당신의 본질을 훼손할 수 없습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#8B5E3C] font-bold">·</span>
            <span>숨을 내쉴 때마다 '나는 소중한 사람이야'라고 마음속으로 조용히 읊조려보세요.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#8B5E3C] font-bold">·</span>
            <span>이 숨결 하나하나가 당신의 마음을 단단하고 평화롭게 채워줄 것입니다.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
