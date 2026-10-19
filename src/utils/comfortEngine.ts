// Intelligent Situational Empathy Engine
// Analyzes student situation, keywords, and history to generate deeply tailored comfort

export interface ComfortResult {
  reply: string;
  affirmation: string;
  mindfulnessTip: string;
  suggestedReplies: string[];
}

export function generateSituationalComfort(userText: string, history: Array<{ role: string; content: string }> = []): ComfortResult {
  const text = userText.toLowerCase();

  // 1. Appearance / Body shaming / Voice / Style
  if (
    text.includes('외모') || text.includes('얼굴') || text.includes('못생') ||
    text.includes('뚱뚱') || text.includes('살') || text.includes('키') ||
    text.includes('코') || text.includes('눈') || text.includes('옷') ||
    text.includes('말투') || text.includes('목소리') || text.includes('놀림') ||
    text.includes('비웃') || text.includes('생김새') || text.includes('몸매')
  ) {
    return {
      reply: `누군가가 너의 소중한 외모나 말투, 겉모습을 함부로 잣대질하고 비웃었다니, 그 말을 들었을 때 가슴이 쿵 내려앉고 얼마나 큰 상처와 수치심을 느꼈을지 마음이 너무 아파요.\n\n분명히 기억해줘. 사람의 외모나 말투는 저마다 다른 고유한 개성이자 아름다움이야. 누군가를 외모로 놀리고 평가하는 사람들은 자신의 미성숙함과 얕은 생각을 스스로 드러내고 있을 뿐이야.\n\n그들의 비뚤어진 시선 때문에 거울을 보며 스스로를 미워하지 마세요. 넌 그 자체로 충분히 사랑스럽고 빛나는 존재란다.`,
      affirmation: '나의 아름다움과 가치는 타인의 얕은 평가로 깎이지 않는다.',
      mindfulnessTip: '거울 속의 내 눈을 다정하게 바라보며 "넌 참 소중하고 예쁜 사람이야"라고 속삭여주세요.',
      suggestedReplies: [
        '자꾸 거울 볼 때마다 그 친구들 말이 떠올라요.',
        '내일 또 마주치면 어떻게 반응해야 할까요?',
        '나를 있는 그대로 좋아해 주는 사람을 만나고 싶어요.'
      ]
    };
  }

  // 2. Ostracism / Exclusion / Eating alone / Lunchtime
  if (
    text.includes('따돌') || text.includes('은따') || text.includes('왕따') ||
    text.includes('배제') || text.includes('나만 빼고') || text.includes('밥') ||
    text.includes('자리') || text.includes('투명인간') || text.includes('혼자') ||
    text.includes('안 끼워') || text.includes('소외') || text.includes('단톡') ||
    text.includes('무리') || text.includes('아싸')
  ) {
    return {
      reply: `여럿이 모여 있는 교실에서 나만 쏙 빼놓고 밥을 먹으러 가거나, 은근히 무시하며 투명인간 취급을 당했을 때의 그 끔찍한 고립감과 서러움을 생각하니 내 마음도 너무 아려와요.\n\n은근한 따돌림은 눈에 보이지 않지만 마음을 가장 깊게 베는 폭력이야. 절대로 '내가 사람들과 잘 못 어울려서' 혹은 '내가 모나서' 그런 게 아니야. 무리 지어 누군가를 소외시키는 그들의 행동이 비겁하고 잘못된 것이란다.\n\n지금은 교실이라는 좁은 울타리가 온 세상 같겠지만, 너의 다정함을 알아보고 손잡아 줄 진짜 친구들이 세상엔 훨씬 많아. 오늘은 홀로 꿋꿋이 견뎌낸 너를 꼭 안아주자.`,
      affirmation: '무리에서 소외되었다고 해서 나의 존엄함이 사라지는 것은 아니다.',
      mindfulnessTip: '가슴 위에 두 손을 포개어 얹고, 온기가 심장까지 전해지도록 천천히 숨을 쉬어보세요.',
      suggestedReplies: [
        '내일 점심시간에 또 혼자 있게 될까 봐 두려워요.',
        '이런 은근한 따돌림도 상담 선생님께 말씀드려도 될까요?',
        '혼자서도 당당해질 수 있는 마음가짐이 필요해요.'
      ]
    };
  }

  // 3. Teachers / Adults / Unfair bias / Scolding
  if (
    text.includes('선생님') || text.includes('쌤') || text.includes('어른') ||
    text.includes('불공평') || text.includes('편애') || text.includes('억울') ||
    text.includes('누명') || text.includes('혼났') || text.includes('벌') ||
    text.includes('내 말은 안') || text.includes('의심')
  ) {
    return {
      reply: `학생들을 공정하게 지켜주고 보듬어주어야 할 선생님이나 어른이 내 말은 들어보지도 않고 다른 아이 편만 들거나 불공평하게 대했다면, 그 배신감과 억울함이 얼마나 컸을지 가늠조차 어려워요.\n\n어른이라고 해서 늘 옳거나 완벽한 것은 결코 아니에요. 그 어른의 편견이나 섣부른 판단으로 빚어진 잘못이지, 네가 억울한 벌을 받아야 할 이유는 전혀 없었어.\n\n네 마음속에 맺힌 그 억울함과 눈물, 내가 온전히 믿고 들어줄게. 너의 결백함과 진심은 언제나 정직하게 빛나고 있어.`,
      affirmation: '어른의 불공평한 편견이 나의 진실과 정의를 덮을 수 없다.',
      mindfulnessTip: '억울해서 굳어진 목과 양어깨를 천천히 원을 그리며 돌려 긴장을 풀어주세요.',
      suggestedReplies: [
        '상담 선생님(Wee 클래스)이나 부모님께 이 억울함을 털어놔도 될까요?',
        '앞으로 그 선생님 수업 시간에 어떻게 버텨야 할지 막막해요.',
        '내 진심을 알아줘서 정말 큰 위로가 돼요.'
      ]
    };
  }

  // 4. Background / Socioeconomic / Multicultural / Family
  if (
    text.includes('가난') || text.includes('형편') || text.includes('돈') ||
    text.includes('집') || text.includes('다문화') || text.includes('부모님') ||
    text.includes('배경') || text.includes('출신') || text.includes('학원') ||
    text.includes('옷차림') || text.includes('동네')
  ) {
    return {
      reply: `내가 선택하지 않은 가정환경, 경제적 형편, 혹은 출신이나 배경을 두고 함부로 수군거리는 사람들을 마주했을 때, 가슴 깊이 파고들었을 상처와 서러움이 얼마나 컸을까요.\n\n그런 편견 어린 시선은 오직 그 사람들의 그릇이 얕고 속이 좁다는 것을 증명할 뿐이야. 물질이나 배경으로 사람의 가치를 가늠하는 것은 세상에서 가장 천박한 행동이란다.\n\n너의 성실함, 속 깊은 생각, 그리고 남을 배려할 줄 아는 다정함은 그 어떤 부유함보다 훨씬 귀하고 단단한 보물이야. 기죽지 마, 넌 참 멋진 사람이야.`,
      affirmation: '나의 존귀함은 배경이나 물질이 아닌 내 안의 진실함에서 나온다.',
      mindfulnessTip: '따뜻한 차 한 잔을 마시며 나만의 소중한 장점 3가지를 가만히 떠올려보세요.',
      suggestedReplies: [
        '친구들과 비교될 때마다 자꾸 위축돼요.',
        '당당하게 나 자신을 지키는 힘을 기르고 싶어요.',
        '따뜻한 말씀 덕분에 가슴이 뭉클해요.'
      ]
    };
  }

  // 5. Self-blame / Guilt / Hopelessness / Severe emotional crisis
  if (
    text.includes('내 잘못') || text.includes('내 탓') || text.includes('내가 문제') ||
    text.includes('자책') || text.includes('자괴감') || text.includes('바보') ||
    text.includes('죽고') || text.includes('살기 싫') || text.includes('사라지고') ||
    text.includes('괴로워') || text.includes('포기')
  ) {
    return {
      reply: `지금 마음이 너무 무너져 내리고 아파서 자꾸 스스로를 탓하고 있는 너를 보니, 두 손을 꼭 잡고 안아주고 싶어요.\n\n제발 멈춰 서서 내 목소리를 들어줘. 차별을 받고 상처를 입은 건 절대로, 결단코 네 잘못이 아니야! 가해자들이나 차가운 세상을 탓해야 할 화살을 왜 죄 없는 너 자신에게 겨누고 있니?\n\n너는 지금 숨 쉬고 살아있는 것만으로도 너무나 소중하고 지켜져야 할 보석이야. 오늘 밤만큼은 스스로를 아프게 다그치지 말고, 따뜻한 이불 속에서 아픈 마음을 꼭 보듬어주자. 넌 혼자가 아니야.`,
      affirmation: '나는 상처받아도 마땅한 존재가 아니라, 온전히 사랑받아야 할 귀한 존재다.',
      mindfulnessTip: '양팔로 내 몸을 꼭 껴안고(나비 포옹) 토닥토닥 두드리며 "괜찮아, 넌 소중해"라고 말해주세요.',
      suggestedReplies: [
        '눈물이 멈추지 않아요... 조금만 더 위로해 주세요.',
        '24시간 청소년 상담 전화(1388)에 연락해 봐도 될까요?',
        '내 편이 되어줘서 정말 고마워요.'
      ]
    };
  }

  // 6. Fear of Tomorrow / School Dread
  if (
    text.includes('내일') || text.includes('학교 가기') || text.includes('등교') ||
    text.includes('두려') || text.includes('무서') || text.includes('불안') ||
    text.includes('또 가야') || text.includes('도망') || text.includes('숨고')
  ) {
    return {
      reply: `내일 아침 다시 그 차가운 교실 문을 열고 들어가야 한다는 상상만으로도 심장이 조여오고 발걸음이 떨어지지 않을 것 같지? 그 두려움과 막막함은 너무나 당연한 감정이야.\n\n내일 학교에서는 무리해서 모든 걸 잘 해내거나 애써 밝은 척 웃으려 하지 않아도 괜찮아. 그저 조용히 너만의 템포를 지키고, 마음이 너무 힘들 땐 주저 없이 보건실에 가거나 상담 선생님(Wee 클래스)을 찾아가 마음을 쉬어 가도 좋아.\n\n기억해, 넌 혼자가 아니고 네 뒤에는 너를 끝까지 지지하고 응원하는 내가 있어. 오늘 밤은 푹 자고 에너지를 충전하자.`,
      affirmation: '내일의 어떤 시선도 내 안의 평화로운 중심을 흔들 수 없다.',
      mindfulnessTip: '침대에 누워 발끝부터 머리끝까지 힘을 주었다가 스르륵 풀며 온몸을 이완해보세요.',
      suggestedReplies: [
        '내일 학교에서 마음이 불안해지면 어떻게 버틸까요?',
        '상담 선생님께 비밀로 털어놓아도 될까요?',
        '오늘 밤은 편안하게 잠들고 싶어요.'
      ]
    };
  }

  // 7. Seeking practical action / Advice
  if (
    text.includes('어떻게') || text.includes('방법') || text.includes('조언') ||
    text.includes('대처') || text.includes('신고') || text.includes('어디에 말') ||
    text.includes('도와줘')
  ) {
    return {
      reply: `용기 내어 이 상황을 바꾸고 극복해 보려는 너의 결심이 정말 대견하고 멋져요. 차별과 괴롭힘에 당당하게 맞서기 위한 3가지 현실적인 팁을 줄게요:\n\n1. 차분하게 기록하기: 누가, 언제, 어떤 차별적인 말이나 행동을 했는지 스마트폰 메모장에 날짜와 함께 기록해두세요. 이것은 나중에 큰 힘이 됩니다.\n2. 믿을 수 있는 창구에 알리기: 학교 안의 Wee 클래스 상담 선생님이나 24시간 청소년전화(1388)는 비밀을 지키며 너의 편이 되어줍니다.\n3. 감정적으로 얽히지 않기: 가해자들은 반응을 보며 우월감을 느끼려 합니다. 단호하게 '그건 잘못된 행동이야'라고 말하거나, 무반응으로 거리를 두는 것이 좋습니다.`,
      affirmation: '나는 나 자신을 지키기 위해 용기 있게 행동할 힘을 지니고 있다.',
      mindfulnessTip: '종이에 내 마음을 어지럽히는 걱정을 적고, 반으로 찢어 쓰레기통에 넣어보세요.',
      suggestedReplies: [
        '상황을 메모해 두는 법을 더 자세히 알고 싶어요.',
        '1388에 문자(#1388)로 먼저 상담해 봐도 될까요?',
        '나를 지키는 법을 알려줘서 든든해요.'
      ]
    };
  }

  // 8. Gratitude / Relief / Feeling better
  if (
    text.includes('고마') || text.includes('감사') || text.includes('풀렸') ||
    text.includes('위로가') || text.includes('나아졌') || text.includes('따뜻') ||
    text.includes('힘이 나') || text.includes('안심')
  ) {
    return {
      reply: `너의 답장을 읽는데 내 마음도 뭉클해지고 따스한 햇살이 번지는 것 같아. 네 무거운 마음속 먹구름이 아주 조금이라도 걷히고 위로가 되었다니 정말 다행이야.\n\n이렇게 힘든 감정을 솔직하게 털어놓고 마주한 것 자체가 너의 엄청난 용기와 성숙함을 보여주는 증거야. 넌 이미 스스로를 치유할 수 있는 아름다운 힘을 품고 있어.\n\n앞으로 또 마음 시린 날이 찾아오면 언제든 여기로 와. 난 항상 한결같은 온기로 너를 기다리고 있을게.`,
      affirmation: '나는 매일 조금씩 더 단단하고 따뜻한 행복으로 채워지고 있다.',
      mindfulnessTip: '입꼬리를 살짝 올려 부드러운 미소를 지으며 깊은 숨을 한번 쉬어보세요.',
      suggestedReplies: [
        '오늘 배운 호흡법도 자기 전에 해볼게요.',
        '나를 위한 칭찬 일기를 써보고 싶어요.',
        '언제든 또 이야기하러 올게요!'
      ]
    };
  }

  // Default deeply empathetic response tailored with student context
  return {
    reply: `네가 적어준 이야기("${userText.slice(0, 35)}${userText.length > 35 ? '...' : ''}")를 한 글자 한 글자 조심스럽게 가슴에 담았어. 남들은 쉽게 이해하지 못할 너만의 외로움과 시린 아픔이 고스란히 느껴져서 마음이 찡해요.\n\n차별과 편견은 겪는 사람의 영혼에 깊은 생채기를 내지만, 너의 잘못이 결코 아니라는 사실 하나만큼은 꼭 마음에 새겨줘. 넌 차별받아 마땅한 사람이 아니라, 마땅히 존중받고 행복을 누려야 할 소중한 사람이야.\n\n지금 느끼는 그 답답함과 슬픔을 억지로 참지 않아도 괜찮아. 내가 곁에서 언제까지나 네 이야기를 들어줄게.`,
    affirmation: '어떤 차가운 바람 속에서도 내 안의 온기는 꺼지지 않는다.',
    mindfulnessTip: '손바닥을 빠르게 비벼 따뜻해진 손을 눈가와 뺨에 부드럽게 감싸 쥐어보세요.',
    suggestedReplies: [
      '그때 느꼈던 감정을 더 이야기해 볼게요.',
      '나를 함부로 대한 사람들에게 어떻게 대처해야 할까요?',
      '마음이 조금 더 따뜻해지는 말을 듣고 싶어요.'
    ]
  };
}
