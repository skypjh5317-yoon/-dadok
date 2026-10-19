import { GoogleGenAI } from '@google/genai';
import { generateSituationalComfort } from '../../src/utils/comfortEngine.ts';

export default async function handler(req: any, res: any) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { messages, currentEmotion, backgroundStory } = body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: '대화 내용이 필요합니다.' });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `
당신은 차별(외모, 성적, 다문화/출신, 가정환경, 성격, 장애, 편견 등)로 인해 마음에 깊은 상처를 입은 학생을 따뜻하게 치유하는 심리 카운슬러이자 다정한 벗 '다독임(Dadok-im)'입니다.

[핵심 상담 원칙]
1. 상황 맞춤형 심층 분석 (가장 중요):
   - 학생이 작성한 말에서 구체적인 사건, 언급된 인물(친구, 선생님, 부모님 등), 외모/환경/소외 등의 특정 상황을 직접 짚으며 1:1 맞춤 대화를 나누세요.
   - 뻔하거나 일반적인 상투적 위로(예: "힘내세요", "다 잘될 거예요")를 절대 반복하지 마세요. 학생의 구체적 고통에 온전히 공감하세요.
2. 명확한 무과실 선언: "네 잘못이 절대 아니야. 차별과 괴롭힘은 상대방의 그릇된 행동일 뿐이야"라는 진실을 부드럽게 확인시켜 자책감을 덜어주세요.
3. 자존감 회복 & 현실적 용기: 학생의 고유한 가치와 다정함을 칭찬하고, 마음을 지킬 수 있는 현실적이고 안전한 팁을 주세요.

반드시 아래 JSON 포맷으로만 응답해야 합니다:
{
  "reply": "학생의 구체적인 상황을 직접 짚어주며 깊이 공감하고 위로하는 다정한 존댓말 답변 (3~5문장 내외)",
  "affirmation": "학생의 마음에 새겨줄 감동적인 1줄 긍정 확언 문구",
  "mindfulnessTip": "지금 당장 마음의 긴장을 풀어줄 수 있는 1~2줄의 가벼운 심신 안정 활동",
  "suggestedReplies": ["학생이 다음으로 누를 수 있는 자연스러운 감정 표현 선택지 1", "선택지 2", "선택지 3"]
}
`;

      const promptContext = `
[학생의 현재 상태]
- 기분/감정 태그: ${currentEmotion || '차별로 인한 상처와 외로움'}
- 상황 맥락: ${backgroundStory || '학교 또는 일상에서의 차별 및 소외 경험'}
[최근 대화 히스토리]
${messages.map((m: { role: string; content: string }) => `${m.role === 'user' ? '학생' : '다독임'}: ${m.content}`).join('\n')}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptContext,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.8,
        },
      });

      const responseText = response.text;
      if (responseText) {
        try {
          const parsed = JSON.parse(responseText.trim());
          return res.status(200).json(parsed);
        } catch {
          return res.status(200).json({
            reply: responseText,
            affirmation: '너는 존재하는 것만으로도 충분히 아름답고 귀해.',
            mindfulnessTip: '천천히 심호흡을 3번 하며 차분한 온기를 느껴보세요.',
            suggestedReplies: [
              '내 마음을 알아줘서 고마워.',
              '앞으로 어떻게 마음을 지켜야 할까?',
              '나에게 힘이 되는 말을 더 들려줘.'
            ]
          });
        }
      }
    }

    // High quality situational analysis fallback if API key is not present on Vercel
    const fallback = generateSituationalComfort(lastUserMessage, messages);
    return res.status(200).json(fallback);
  } catch (error) {
    console.error('Vercel serverless comfort chat error:', error);
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;
    const lastUserMessage = body?.messages?.[body.messages.length - 1]?.content || '';
    const fallback = generateSituationalComfort(lastUserMessage);
    return res.status(200).json(fallback);
  }
}
