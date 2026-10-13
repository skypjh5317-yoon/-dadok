import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Volume2, VolumeX, RotateCcw, Heart, ShieldAlert } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  affirmation?: string;
  mindfulnessTip?: string;
  suggestedReplies?: string[];
  timestamp: string;
}

const PRESET_TOPICS = [
  { label: '친구들의 은근한 소외와 무시', prompt: '오늘 학교에서 친구들이 나만 빼고 이야기를 나누고 은근히 따돌려서 너무 외롭고 서러워요.' },
  { label: '외모나 성격에 대한 놀림', prompt: '친구들이 내 외모나 말투를 장난처럼 흉내 내며 놀려요. 장난이라는데 저는 너무 큰 상처가 돼요.' },
  { label: '가정형편이나 배경에 대한 편견', prompt: '내 배경이나 형편에 대해 함부로 수군거리는 시선 때문에 학교에 가기가 두려워요.' },
  { label: '선생님이나 어른의 불공평한 대우', prompt: '내가 잘못하지도 않았는데 다른 친구 편만 들고 불공평하게 혼이 났어요. 너무 억울해요.' },
  { label: '자꾸 내 탓만 하게 되는 자책감', prompt: '내가 부족하거나 모나서 차별을 받는 걸까 봐 자꾸 나 자신을 미워하게 돼요.' },
];

export const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        '안녕, 정말 잘 찾아왔어. 오늘 학교에서, 혹은 누군가의 차가운 말과 편견 때문에 마음이 많이 시리고 아팠지?\n\n이곳에서는 어떤 부담도 갖지 말고 네 솔직한 기분을 털어놓아도 좋아. 그 어떤 순간에도 넌 소중하고 귀한 사람이며, 네가 겪은 부당한 일은 절대 네 잘못이 아니야.\n\n지금 마음에 맺혀 있는 이야기를 편하게 들려줄래? 내가 온 마음으로 네 편이 되어 들어줄게.',
      affirmation: '너는 그 자체로 온전하고 존중받아 마땅한 사람이야.',
      mindfulnessTip: '어깨의 힘을 툭 빼고, 천천히 따뜻한 숨을 들이마셔 보세요.',
      suggestedReplies: [
        '오늘 나만 빼고 무시당하는 기분이었어...',
        '내가 잘못해서 차별받는 걸까 봐 무서워.',
        '너무 외롭고 아무도 내 편이 없는 것 같아.'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSend = async (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/comfort/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          currentEmotion: '차별받아 아픈 학생의 마음',
        }),
      });

      if (!response.ok) {
        throw new Error('응답 실패');
      }

      const data = await response.json();

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply || '많이 아팠지? 네 곁에 언제나 따스한 온기로 함께할게.',
        affirmation: data.affirmation,
        mindfulnessTip: data.mindfulnessTip,
        suggestedReplies: data.suggestedReplies || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      // Gentle fallback
      const fallbackMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content:
          '네 마음속 그 슬픔과 억울함이 얼마나 무거울지 가늠조차 어려워. 하지만 분명히 기억해줘. 다른 사람의 편협한 시선이 너의 가치를 결정할 수는 없어. 넌 여전히 눈부시게 소중한 존재란다. 오늘 하루를 버텨낸 너 자신을 꼭 따뜻하게 안아줘.',
        affirmation: '너는 결코 혼자가 아니며, 너의 내일은 오늘보다 더 환할 거야.',
        mindfulnessTip: '가슴 위에 손을 가만히 얹고, 심장이 전해주는 따스한 고동을 느껴보세요.',
        suggestedReplies: [
          '내 편이 되어줘서 고마워.',
          '앞으로 어떻게 마음을 다잡아야 할까?',
          '마음이 조금 가벼워졌어.'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (activeSpeechId === msgId) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9; // Calm, gentle pacing
    utterance.pitch = 1.0;

    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);

    setActiveSpeechId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const resetChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveSpeechId(null);
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content:
          '마음을 비우고 새롭게 대화를 시작할 준비가 되었어. 언제든 마음에 걸리는 일이 생기면 편안하게 털어놓아줘. 난 늘 네 편이야.',
        affirmation: '모든 새로운 시작은 너를 향한 따뜻한 응원이야.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto px-4 py-4 sm:py-6">
      {/* Top Helper Banner */}
      <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-[#E9DFCB] shadow-xs mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#F0E8D9]">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#A86438]" />
            <h2 className="text-sm font-semibold text-[#3B2C20]">
              마음의 짐을 덜어놓는 공간
            </h2>
            <span className="text-xs text-[#8E7C6C] hidden sm:inline">
              · 아무런 편견 없이 네 아픔을 온전히 안아드립니다
            </span>
          </div>
          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 text-xs text-[#7D6B5A] hover:text-[#3B2C20] hover:bg-[#F3EFE6] px-2.5 py-1 rounded-lg transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>대화 다시 시작</span>
          </button>
        </div>

        {/* Quick Feeling Starters */}
        <div className="pt-2.5">
          <p className="text-xs text-[#7F6E5E] mb-2 font-medium">
            어떤 이야기부터 꺼내야 할지 막막하다면 눌러보세요:
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESET_TOPICS.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(topic.prompt)}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-medium bg-[#F6EFE3] hover:bg-[#EFE2D0] text-[#554333] rounded-lg transition-colors border border-[#E7DBC4] disabled:opacity-50 text-left"
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2">
        {messages.map((message) => {
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-xs transition-all ${
                  isUser
                    ? 'bg-[#8B5E3C] text-white rounded-tr-xs'
                    : 'bg-white text-[#2C241D] border border-[#E9DFCB] rounded-tl-xs'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-[#F4ECE0]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#EFE3D2] text-[#8B5E3C] flex items-center justify-center font-bold text-xs">
                        온
                      </div>
                      <span className="text-xs font-semibold text-[#5A4636]">
                        다독임
                      </span>
                    </div>

                    <button
                      onClick={() => handleSpeak(message.id, message.content)}
                      title={activeSpeechId === message.id ? '음성 중지' : '음성으로 다정하게 듣기'}
                      className="flex items-center gap-1 text-xs text-[#8A7867] hover:text-[#8B5E3C] px-2 py-0.5 rounded-md hover:bg-[#F9F5EE] transition-colors"
                    >
                      {activeSpeechId === message.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-[#C85A32]" />
                          <span className="text-[#C85A32]">말하는 중...</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>소리로 듣기</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Message Body */}
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {message.content}
                </div>

                {/* Affirmation Card Box */}
                {!isUser && message.affirmation && (
                  <div className="mt-3.5 pt-3 border-t border-[#F2EAE0]">
                    <div className="p-3 bg-[#FAF4EA] rounded-xl border border-[#EADFCB]">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B5E3C] mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>마음에 품을 따뜻한 한 줄</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#4D3A2C]">
                        "{message.affirmation}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Mindfulness Tip */}
                {!isUser && message.mindfulnessTip && (
                  <div className="mt-2.5 px-3 py-2 bg-[#F3EFE6] rounded-xl text-xs text-[#5D4C3E] flex items-start gap-2">
                    <span className="font-semibold text-[#8B5E3C] shrink-0">🌿 작은 쉼:</span>
                    <span>{message.mindfulnessTip}</span>
                  </div>
                )}

                <div
                  className={`text-[11px] mt-2 text-right ${
                    isUser ? 'text-[#F3E6D7]' : 'text-[#A08F7E]'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>

              {/* Follow-up Suggestion Buttons */}
              {!isUser && message.suggestedReplies && message.suggestedReplies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 ml-1 max-w-[85%]">
                  {message.suggestedReplies.map((reply, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSend(reply)}
                      disabled={isLoading}
                      className="px-3 py-1.5 text-xs text-[#6B5744] bg-white hover:bg-[#F5EDE1] border border-[#E5DAC4] rounded-xl shadow-2xs transition-colors hover:text-[#3B2C20] disabled:opacity-50 text-left"
                    >
                      💬 {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-white border border-[#E9DFCB] rounded-2xl rounded-tl-xs p-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-[#7F6E5E]">
                <div className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-ping" />
                <span>네 마음에 가장 따스한 위로를 적어 내려가고 있어요...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-3 pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center bg-white rounded-2xl border border-[#E2D5BE] focus-within:border-[#8B5E3C] focus-within:ring-2 focus-within:ring-[#8B5E3C]/20 shadow-xs transition-all"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="상처받았던 순간, 지금의 속상한 기분을 무엇이든 적어보세요..."
            disabled={isLoading}
            className="flex-1 px-4 sm:px-5 py-3.5 text-sm text-[#2C241D] placeholder-[#A69584] bg-transparent outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="m-1.5 p-2.5 rounded-xl bg-[#8B5E3C] hover:bg-[#724B2E] text-white disabled:opacity-30 disabled:hover:bg-[#8B5E3C] transition-colors shrink-0"
            title="마음 보내기"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-[#8C7A68] mt-2 px-2">
          <span>차별은 당신의 잘못이 아닙니다. 어떤 말이든 안전하게 털어놓으세요.</span>
          <span className="hidden sm:inline flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-[#A86438]" /> 24시간 청소년 긴급상담: 1388
          </span>
        </div>
      </div>
    </div>
  );
};
