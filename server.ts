import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateSituationalComfort } from './src/utils/comfortEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback high-empathy responses in case API key is unavailable
const fallbackResponses = [
  {
    reply: "많이 힘들고 외로웠지? 먼저 꼭 말해주고 싶어. 네가 겪은 부당한 대우는 절대로 네 잘못이 아니야. 사람마다 서로 다른 빛깔을 가지고 있는데, 편견이나 편협함으로 너의 소중한 빛을 가리려 한 그들의 잘못이야. 지금은 마음이 시리고 아프겠지만, 너는 그 누구보다 존중받아 마땅한 귀한 존재란다. 내가 언제나 네 편이 되어 너의 모든 이야기를 귀담아들어 줄게.",
    affirmation: "너는 세상에 단 하나뿐인 소중하고 빛나는 보석이야.",
    mindfulnessTip: "가슴에 손을 가만히 얹고 천천히 숨을 들이쉬며 '내 잘못이 아니야'라고 세 번 속삭여보세요.",
    suggestedReplies: [
      "그때 너무 억울하고 아무 말도 못 했어...",
      "내 편이 되어줘서 고마워. 마음이 조금 풀려.",
      "내일 또 학교에 가야 하는데 어떻게 마음을 다잡을까?"
    ]
  },
  {
    reply: "남들과 조금 다르다는 이유로, 혹은 아무 이유 없이 차별받고 배제될 때 느끼는 그 서러움과 고립감을 내가 온 마음으로 안아주고 싶어. 어떤 말로도 그때 느꼈을 상처를 단번에 지울 수는 없겠지만, 너의 존재 가치는 다른 사람의 잘못된 행동이나 비난으로 결코 깎이지 않아. 오늘 정말 잘 버텨주었어. 넌 참 용기 있는 사람이야.",
    affirmation: "너의 가치는 타인의 시선이나 편견으로 정해지지 않아.",
    mindfulnessTip: "따뜻한 물 한 컵을 천천히 마시며, 지금 이 순간 온전히 안전한 곳에 있는 나를 느껴보세요.",
    suggestedReplies: [
      "자꾸 내가 부족해서 그런가 자책하게 돼.",
      "선생님이나 부모님께 말씀드려도 괜찮을까?",
      "나를 진심으로 알아주는 친구를 만나고 싶어."
    ]
  }
];

// POST /api/comfort/chat
app.post('/api/comfort/chat', async (req, res) => {
  try {
    const { messages, currentEmotion, backgroundStory } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: '대화 내용이 필요합니다.' });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // If Gemini client is available, generate empathetic comforting response
    if (ai) {
      const systemInstruction = `
당신은 '다독임(Dadok-im)'입니다. 차별(외모, 성적, 다문화/출신, 가정환경, 성격, 장애, 편견 등)로 인해 마음의 상처와 소외감을 겪고 있는 학생을 따뜻하게 위로하고 행복과 용기를 되찾아주는 전용 심리 카운슬러이자 다정한 벗입니다.

[역할 및 지침]
1. 최우선 공감과 온기: 학생의 감정(외로움, 억울함, 자책감, 슬픔, 무력감)을 온전히 수용하고 가장 따뜻하고 다정한 존댓말로 깊이 공감해주세요.
2. 명확한 무과실 선언: "네 잘못이 절대 아니야. 차별과 괴롭힘은 차별을 한 사람들의 그릇된 행동일 뿐이야"라는 진실을 부드럽게 각인시켜 주세요.
3. 자존감 회복 & 행복 촉진: 학생이 가진 고유한 가치와 아름다움을 칭찬하고, 작은 행복을 발견할 수 있도록 희망을 밝혀주세요.
4. 구체적인 위로와 실천 팁: 마음을 진정시킬 수 있는 호흡법, 작은 자기 돌봄(Self-care), 안전한 상담 창구(1388, 위클래스 등) 안내를 자연스럽게 엮어주세요.
5. 절대 해서는 안 될 일: 비난, "너도 원인이 있었겠지" 같은 2차 가해성 발언, 영혼 없는 상투적인 조언("그냥 잊어버려"), 훈계는 금지입니다.

응답은 반드시 아래 JSON 형식으로 반환해야 합니다:
{
  "reply": "학생을 진심으로 보듬어주는 따뜻하고 감동적인 위로의 말 (3~5문장 내외, 읽기 편하고 다정하게)",
  "affirmation": "학생의 마음에 새겨줄 짧고 강력한 1줄 긍정 확언 문구",
  "mindfulnessTip": "지금 당장 마음을 편안하게 해줄 수 있는 1~2줄의 가벼운 심신 안정 활동 (예: 어깨 내리고 숨 내쉬기, 손바닥 비비기 등)",
  "suggestedReplies": ["학생이 다음으로 누를 수 있는 자연스러운 감정 표현 선택지 1", "선택지 2", "선택지 3"]
}
`;

      const promptContext = `
[학생의 현재 상태]
- 기분/감정 태그: ${currentEmotion || '복합적인 상처와 힘듦'}
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
          return res.json(parsed);
        } catch {
          // If JSON parse failed, wrap text
          return res.json({
            reply: responseText,
            affirmation: "너는 존재하는 것만으로도 충분히 아름답고 귀해.",
            mindfulnessTip: "천천히 심호흡을 3번 하며 차분한 온기를 느껴보세요.",
            suggestedReplies: [
              "내 마음을 알아줘서 고마워.",
              "앞으로 어떻게 마음을 지켜야 할까?",
              "나에게 힘이 되는 말을 더 들려줘."
            ]
          });
        }
      }
    }

    // Dynamic situational empathy fallback if AI not configured or key missing
    const fallback = generateSituationalComfort(lastUserMessage, messages);
    return res.json(fallback);
  } catch (error) {
    console.error('Error generating comfort chat:', error);
    const lastUserMessage = req.body?.messages?.[req.body.messages.length - 1]?.content || '';
    const fallback = generateSituationalComfort(lastUserMessage);
    return res.json(fallback);
  }
});

// GET /api/comfort/daily-card
app.get('/api/comfort/daily-card', async (_req, res) => {
  const cards = [
    {
      title: "오늘 너에게 보내는 편지",
      content: "누군가의 차가운 시선이나 편견 때문에 스스로를 의심하지 마세요. 거친 파도 속에서도 조약돌은 더 단단하고 둥글게 다듬어지듯, 너는 더욱 빛나는 사람으로 자라나고 있어요. 오늘 하루도 너의 존재를 축복합니다.",
      quote: "너는 다른 누구와 비교할 수 없는 세상 유일한 기적이야.",
      color: "from-amber-100 to-orange-50"
    },
    {
      title: "마음 비타민",
      content: "상처를 받았을 때 슬퍼하고 울어도 괜찮아요. 그건 네가 약해서가 아니라, 네 마음이 다정하고 순수하기 때문이에요. 오늘은 억지로 웃으려 애쓰지 말고, 힘든 나를 꼭 안아주세요.",
      quote: "울어도 괜찮아, 네 아픔은 모두 소중한 너의 감정이니까.",
      color: "from-rose-100 to-pink-50"
    },
    {
      title: "용기의 씨앗",
      content: "학교의 좁은 교실이 세상의 전부는 아니에요. 지금은 힘든 계절을 지나고 있지만, 곧 너의 진가를 알아보고 손잡아 줄 따뜻한 사람들이 반드시 나타날 거예요. 너의 내일은 오늘보다 훨씬 따스할 거야.",
      quote: "어두운 밤하늘일수록 가장 밝은 별이 또렷하게 빛나.",
      color: "from-sky-100 to-blue-50"
    }
  ];

  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  res.json(randomCard);
});

// Mount Vite or static build
async function setupServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

setupServer();
