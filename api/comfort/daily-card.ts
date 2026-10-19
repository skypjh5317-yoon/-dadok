export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
  return res.status(200).json(randomCard);
}
