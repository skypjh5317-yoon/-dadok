import React from 'react';
import { Phone, ShieldCheck, HeartHandshake, ExternalLink, HelpCircle } from 'lucide-react';

const HOTLINES = [
  {
    name: '청소년전화 1388',
    number: '1388',
    type: '24시간 무료 전화 / 문자',
    desc: '외로움, 차별, 대인관계, 진로 등 청소년의 모든 고민을 365일 24시간 비밀 보장으로 무료 상담해 드립니다.',
    actionUrl: 'tel:1388',
    smsSupport: '문자 #1388 / 카카오톡 #1388'
  },
  {
    name: '학교폭력 및 차별 피해 117',
    number: '117',
    type: '24시간 전용 핫라인',
    desc: '따돌림, 괴롭힘, 신체적/언어적 폭력 및 차별 행위에 대해 전문 수사관과 상담사가 신속하고 안전하게 돕습니다.',
    actionUrl: 'tel:117',
    smsSupport: '문자 #0117'
  },
  {
    name: '청소년 모바일 문자상담 (다 들어줄 개)',
    number: '1661-5004',
    type: '어플리케이션 및 카카오톡',
    desc: '전화 통화가 부담스러운 학생들을 위해 모바일 메신저로 따뜻하고 편안하게 친구처럼 대화를 나눕니다.',
    actionUrl: 'https://teenline.or.kr',
    smsSupport: '24시간 문자 1661-5004'
  },
  {
    name: '국가인권위원회 차별시정상담 1331',
    number: '1331',
    type: '평일 09:00~18:00',
    desc: '성별, 외모, 다문화, 장애, 가정환경 등으로 인한 부당한 차별 행위에 대한 법적 구제 및 전문 상담을 제공합니다.',
    actionUrl: 'tel:1331',
    smsSupport: '홈페이지 www.humanrights.go.kr'
  }
];

export const SafeResources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      {/* Visual Header */}
      <div className="relative rounded-3xl overflow-hidden mb-8 border border-[#E8DEC9] shadow-xs">
        <img
          src="/src/assets/images/cozy_sanctuary_space_1791861085374.jpg"
          alt="평온하고 안전한 쉼터 공간"
          referrerPolicy="no-referrer"
          className="w-full h-44 sm:h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <span className="text-xs font-semibold text-[#FBE3B5] uppercase tracking-wider mb-1">
            안심 지원 창구 & 학생 권리
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            혼자 끙끙 앓지 마세요, 네 편이 되어줄 곳이 있습니다
          </h2>
          <p className="text-xs sm:text-sm text-[#F0E6D8] mt-1 max-w-xl">
            차별과 따돌림은 당신의 탓이 아닙니다. 도움을 요청하는 것은 결코 부끄러운 일이 아니라 나를 지키는 가장 큰 용기입니다.
          </p>
        </div>
      </div>

      {/* 3 Core Truths */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DEC8] shadow-xs mb-8">
        <h3 className="text-base sm:text-lg font-bold text-[#3B2C20] flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#8B5E3C]" />
          차별받았을 때 내가 반드시 기억해야 할 3가지 진실
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4.5 rounded-2xl bg-[#FAF5EC] border border-[#EBE0CD]">
            <span className="text-xs font-bold text-[#8B5E3C] block mb-1">진실 1</span>
            <h4 className="text-sm font-bold text-[#3E2F23] mb-1.5">
              100% 가해자의 잘못입니다
            </h4>
            <p className="text-xs text-[#6F5F51] leading-relaxed">
              어떤 외모, 성격, 환경도 차별받아야 마땅한 이유가 될 수 없습니다. 부당한 행동을 한 사람들의 미성숙함이 원인입니다.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-[#FAF5EC] border border-[#EBE0CD]">
            <span className="text-xs font-bold text-[#8B5E3C] block mb-1">진실 2</span>
            <h4 className="text-sm font-bold text-[#3E2F23] mb-1.5">
              나의 가치는 훼손되지 않습니다
            </h4>
            <p className="text-xs text-[#6F5F51] leading-relaxed">
              누군가의 삐뚤어진 말 한마디로 당신의 보석 같은 빛깔이 닳아 없어지지 않습니다. 당신은 여전히 귀하고 소중합니다.
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-[#FAF5EC] border border-[#EBE0CD]">
            <span className="text-xs font-bold text-[#8B5E3C] block mb-1">진실 3</span>
            <h4 className="text-sm font-bold text-[#3E2F23] mb-1.5">
              손을 내밀면 도울 어른이 있습니다
            </h4>
            <p className="text-xs text-[#6F5F51] leading-relaxed">
              학교 안의 위클래스(Wee 클래스), 전문 상담 교사, 혹은 24시간 청소년 상담 전화는 언제나 당신의 편에서 비밀을 지켜줍니다.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Korean Student Hotlines */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#3B2C20] flex items-center gap-2 px-1">
          <Phone className="w-4 h-4 text-[#8B5E3C]" />
          24시간 비밀 보장 무료 상담 전화
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOTLINES.map((hotline, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#E7DEC8] shadow-xs flex flex-col justify-between hover:border-[#8B5E3C] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-bold text-[#3B2C20]">
                    {hotline.name}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#8B5E3C] bg-[#FAF3E8] px-2.5 py-0.5 rounded-full border border-[#E8DEC9]">
                    {hotline.type}
                  </span>
                </div>
                <p className="text-xs text-[#6F5E50] leading-relaxed mb-3">
                  {hotline.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2E8DA] flex items-center justify-between">
                <span className="text-xs text-[#8A7867]">
                  {hotline.smsSupport}
                </span>
                <a
                  href={hotline.actionUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8B5E3C] hover:bg-[#724B2E] text-white text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{hotline.number}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Action Tips */}
      <div className="mt-8 bg-white/80 rounded-2xl p-6 border border-[#E8DEC9]">
        <h4 className="text-sm font-bold text-[#3B2C20] flex items-center gap-2 mb-2.5">
          <HelpCircle className="w-4 h-4 text-[#8B5E3C]" />
          차별적인 상황에 부딪혔을 때 대처 가이드
        </h4>
        <ul className="text-xs text-[#6B5A4B] space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="font-bold text-[#8B5E3C]">1.</span>
            <span><strong>기록해두기:</strong> 언제, 어디서, 누가 어떤 차별적인 말이나 행동을 했는지 날짜와 상황을 스마트폰 메모장에 차분히 적어두세요.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-[#8B5E3C]">2.</span>
            <span><strong>혼자 감당하지 않기:</strong> 학교의 전문상담교사(Wee 클래스), 믿을 수 있는 부모님, 혹은 1388 전화로 상황을 솔직하게 털어놓으세요.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-[#8B5E3C]">3.</span>
            <span><strong>나를 지키는 마음 챙김:</strong> 오늘 밤은 좋아하는 음악을 듣고, 나를 따뜻하게 대해준 사람들의 얼굴을 떠올리며 스스로를 칭찬해주세요.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
