import React, { useState } from 'react';
import { Plus, Trash2, Heart, Award, Calendar, Smile } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  selfPraise: string;
  gratitude: string;
  moodFeeling: string;
}

const DEFAULT_ENTRIES: JournalEntry[] = [
  {
    id: 'entry-1',
    date: '2026-10-12',
    selfPraise: '오늘 속상한 말을 들었지만, 흔들리지 않고 끝까지 수업을 듣고 집에 돌아온 내 자신이 참 대견해.',
    gratitude: '하굣길에 마주친 길고양이가 눈인사를 해준 것, 저녁에 엄마가 끓여주신 따뜻한 된장찌개.',
    moodFeeling: '조금 홀가분해요'
  }
];

export const SelfCareJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      const stored = localStorage.getItem('dadokim_journal');
      return stored ? JSON.parse(stored) : DEFAULT_ENTRIES;
    } catch {
      return DEFAULT_ENTRIES;
    }
  });

  const [selfPraise, setSelfPraise] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [moodFeeling, setMoodFeeling] = useState('차분하고 따뜻해요');
  const [isSuccessFeedback, setIsSuccessFeedback] = useState(false);

  const saveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selfPraise.trim() && !gratitude.trim()) return;

    const newEntry: JournalEntry = {
      id: `journal-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      selfPraise: selfPraise.trim() || '오늘 하루도 끝까지 잘 살아낸 나 자신을 칭찬해.',
      gratitude: gratitude.trim() || '나를 안아주는 이 조용한 쉼터의 시간.',
      moodFeeling,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem('dadokim_journal', JSON.stringify(updated));
    } catch {
      // Ignored
    }

    setSelfPraise('');
    setGratitude('');
    setIsSuccessFeedback(true);
    setTimeout(() => setIsSuccessFeedback(false), 3000);
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    try {
      localStorage.setItem('dadokim_journal', JSON.stringify(updated));
    } catch {
      // Ignored
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      <div className="text-center mb-8 max-w-lg mx-auto">
        <span className="text-xs font-semibold text-[#8B5E3C] bg-[#FAF2E6] px-3 py-1 rounded-full border border-[#E9DEC8]">
          나를 돌보는 시간
        </span>
        <h2 className="text-2xl font-bold text-[#2E231A] mt-2">
          나를 위한 행복 기록장
        </h2>
        <p className="text-sm text-[#796758] mt-1.5 leading-relaxed">
          타인의 편견에 내 가치를 맡기지 마세요.
          오늘 하루도 묵묵히 버텨낸 나에게 건네는 다정한 칭찬 한 줄이 내 마음을 단단하게 지켜줍니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form: Writing today's praise */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 border border-[#E7DEC8] shadow-xs">
          <h3 className="text-base font-bold text-[#3B2C20] flex items-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-[#C16238]" />
            오늘 나에게 보내는 다정한 한 줄
          </h3>

          <form onSubmit={saveEntry} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#5D4A3A] mb-1.5">
                오늘 나를 칭찬하고 싶은 점 (작은 것도 좋아요)
              </label>
              <textarea
                value={selfPraise}
                onChange={(e) => setSelfPraise(e.target.value)}
                placeholder="예: 힘든 마음을 꾹 참고 스스로를 챙긴 것, 좋아하는 음악을 들으며 마음을 달랜 것..."
                rows={3}
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#E1D4BD] focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/20 outline-none text-[#33271D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5D4A3A] mb-1.5">
                오늘 마주한 작고 소중한 순간이나 감사
              </label>
              <textarea
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                placeholder="예: 구름이 예뻤던 하늘, 편안한 침대, 따뜻한 차 한 잔..."
                rows={2}
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#E1D4BD] focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#8B5E3C]/20 outline-none text-[#33271D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5D4A3A] mb-1.5">
                지금 내 마음의 기분
              </label>
              <select
                value={moodFeeling}
                onChange={(e) => setMoodFeeling(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-[#E1D4BD] bg-white text-[#33271D] outline-none"
              >
                <option value="차분하고 따뜻해요">🌿 차분하고 따뜻해요</option>
                <option value="조금 홀가분해요">✨ 조금 홀가분해요</option>
                <option value="아직은 상처가 아파요">🌧️ 아직은 상처가 아파요</option>
                <option value="힘을 내보는 중이에요">🌱 힘을 내보는 중이에요</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!selfPraise.trim() && !gratitude.trim()}
              className="w-full py-3 rounded-xl bg-[#8B5E3C] hover:bg-[#744D30] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
              <span>기록장에 소중히 담기</span>
            </button>

            {isSuccessFeedback && (
              <div className="p-3 bg-[#FAF4EA] text-[#8B5E3C] rounded-xl text-xs font-semibold text-center border border-[#E9DEC8]">
                참 잘했어요! 너의 하루는 그 어떤 편견보다 훨씬 눈부셔요.
              </div>
            )}
          </form>
        </div>

        {/* Right List: Past entries */}
        <div className="md:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#7F6E5E] px-1 font-semibold">
            <span>나의 마음 기록들 ({entries.length})</span>
            <span className="text-[11px] font-normal">오직 내 브라우저에만 안전하게 보관됩니다</span>
          </div>

          {entries.length === 0 ? (
            <div className="bg-white/60 rounded-3xl p-8 text-center border border-[#E7DEC8] text-[#8D7C6D]">
              <Smile className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">아직 작성된 기록이 없어요.</p>
              <p className="text-xs mt-1 text-[#9F8F81]">오늘 버텨낸 나 자신에게 첫 칭찬을 선물해보세요.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-2xl p-4.5 border border-[#E7DEC8] shadow-xs relative group"
                >
                  <div className="flex items-center justify-between text-xs text-[#8A7969] mb-2 pb-2 border-b border-[#F4ECE0]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{entry.date}</span>
                      <span className="text-[#C1B2A1]">·</span>
                      <span className="text-[#8B5E3C] font-medium">{entry.moodFeeling}</span>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-[#B5A495] hover:text-[#C85A32] p-1 transition-colors"
                      title="삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    {entry.selfPraise && (
                      <div>
                        <span className="font-semibold text-[#8B5E3C] text-[11px] block">
                          나를 향한 칭찬
                        </span>
                        <p className="text-[#3A2D22] leading-relaxed">{entry.selfPraise}</p>
                      </div>
                    )}

                    {entry.gratitude && (
                      <div className="pt-1">
                        <span className="font-semibold text-[#6E5946] text-[11px] block">
                          소중한 순간 & 감사
                        </span>
                        <p className="text-[#554334] leading-relaxed">{entry.gratitude}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
