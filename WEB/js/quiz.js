/**
 * 매직 입체도형 3D 인터랙티브 랩 - 3단계 발문 탐구 및 인터랙티브 퀴즈 모듈
 */

const INQUIRY_QUESTIONS = {
  triangular_prism: {
    before: {
      stage: '1단계: 관찰 및 예측 (Before Pulling)',
      question: '이 전개도를 펼쳐놓았을 때 삼각형과 사각형은 각각 몇 개일까요? 실을 당기면 어떤 기둥이 만들어질까요?',
      hint: '밑면이 삼각형이고 옆면이 직사각형인 각기둥입니다.',
      answerText: '삼각형 2개, 직사각형 3개입니다. 실을 당기면 두 삼각형 밑면이 마주보며 삼각기둥이 완성됩니다.'
    },
    while: {
      stage: '2단계: 조작 및 검증 (While Pulling)',
      question: '실을 아주 천천히 당겨보세요. 평면 상태에서 가장 멀리 떨어져 있던 두 점(타공점) 사이의 거리는 어떻게 변하나요?',
      hint: 'PULL 슬라이더를 0%에서 100%로 천천히 움직여보세요.',
      answerText: '실이 당겨지면서 두 타공점 사이의 거리가 0으로 줄어들고, 가장 멀리 떨어져 있던 모서리가 하나로 맞물립니다.'
    },
    after: {
      stage: '3단계: 추론 및 응용 (After Pulling)',
      question: '완성된 삼각기둥에서 두 삼각형 밑면은 서로 어떤 위치 관계에 있나요?',
      hint: '아무리 늘려도 서로 만나지 않는 관계입니다.',
      answerText: '두 밑면은 서로 완벽하게 평행(Parallel)하고 크기와 모양이 같은 합동입니다.'
    }
  },
  cuboid: {
    before: {
      stage: '1단계: 관찰 및 예측 (Before Pulling)',
      question: '직육면체 전개도에서 1번 밑면(하늘색)과 마주보며 평행하게 안착할 면은 몇 번 면일까요?',
      hint: '전개도 상에서 한 면을 건너뛰어 연결된 면을 찾아보세요.',
      answerText: '4번 윗면(하늘색)입니다. 직육면체는 마주보는 세 쌍의 면이 각각 합동이고 평행합니다.'
    },
    while: {
      stage: '2단계: 조작 및 검증 (While Pulling)',
      question: '실을 당기면 왜 앞면과 뒷면, 좌우 옆면이 동시에 일어날까요?',
      hint: '타공 구멍을 통과하는 실의 장력(Tension) 경로를 확인하세요.',
      answerText: '대각선으로 교차 통과한 실이 당겨지면서 하나의 손잡이 장력이 모든 면의 힌지에 균일하게 전달되기 때문입니다.'
    },
    after: {
      stage: '3단계: 추론 및 응용 (After Pulling)',
      question: '우리가 일상에서 자주 마시는 우유갑이나 택배 상자도 이렇게 실을 당겨 만들 수 있을까요?',
      hint: '직육면체 패키지 디자인의 기본 원리입니다.',
      answerText: '네! 모든 직육면체 상자는 만나는 모서리 길이를 일치시키고 타공점을 대칭 배치하면 원터치로 조립할 수 있습니다.'
    }
  },
  cube: {
    before: {
      stage: '1단계: 관찰 및 예측 (Before Pulling)',
      question: '정육면체는 정사각형 6개로 이루어져 있습니다. 펼쳤을 때 만들 수 있는 전개도는 총 몇 가지일까요?',
      hint: '초등 5학년 2학기 최고 난이도 문항입니다.',
      answerText: '총 11가지입니다. 그중 계단형이나 T자형처럼 연속된 변이 많은 전개도가 실로 당기기에 가장 적합합니다.'
    },
    while: {
      stage: '2단계: 조작 및 검증 (While Pulling)',
      question: '각 면이 접힐 때 모서리는 몇 도(Angle)씩 회전하여 정육면체로 닫히나요?',
      hint: '정육면체의 면과 면이 이루는 각도입니다.',
      answerText: '평면(0도)에서 정확히 90도(직각)씩 회전하여 모든 면이 수직/평행으로 안착합니다.'
    },
    after: {
      stage: '3단계: 추론 및 응용 (After Pulling)',
      question: '만약 서로 마주보아야 할 면 2개가 한쪽 모서리에 나란히 붙어있다면 당겼을 때 어떻게 될까요?',
      hint: '전개도 오답 함정 문제입니다.',
      answerText: '두 면이 겹치게(Overlap) 되어 상자의 뚜껑이 닫히지 않고 한쪽이 뚫린 불완전한 형태가 됩니다.'
    }
  },
  cylinder: {
    before: {
      stage: '1단계: 관찰 및 예측 (Before Pulling)',
      question: '직사각형 옆면의 가로 길이는 밑면인 원의 어떤 치수와 정확히 같아야 할까요?',
      hint: '원 테두리를 감싸며 빈틈없이 맞닿아야 합니다.',
      answerText: '밑면 원의 둘레(원주 = 2πr)와 완벽히 일치해야 합니다.'
    },
    while: {
      stage: '2단계: 조작 및 검증 (While Pulling)',
      question: '실을 서서히 당길 때 직사각형 옆면이 어떻게 변하는지 관찰해보세요.',
      hint: '평면에서 곡면으로 부드럽게 말려 들어갑니다.',
      answerText: '평평했던 직사각형이 둥근 곡면으로 롤링(Rolling)되면서 원형 밑면의 테두리를 감싸 안습니다.'
    },
    after: {
      stage: '3단계: 추론 및 응용 (After Pulling)',
      question: '음료수 캔이나 종이컵을 전개도로 펼치면 옆면은 어떤 모양이 될까요?',
      hint: '직사각형 또는 부채꼴 모양입니다.',
      answerText: '원기둥형 캔은 직사각형, 위아래 반지름이 다른 종이컵은 부채꼴 모양의 곡면 전개도가 됩니다.'
    }
  },
  dome: {
    before: {
      stage: '1단계: 관찰 및 예측 (Before Pulling)',
      question: '각기둥과 각뿔 전개도의 가장 결정적인 차이점은 무엇일까요?',
      hint: '밑면의 개수와 옆면의 모양을 비교해보세요.',
      answerText: '각기둥은 밑면이 2개이고 옆면이 직사각형이지만, 각뿔은 밑면이 1개이고 모든 옆면이 삼각형입니다.'
    },
    while: {
      stage: '2단계: 조작 및 검증 (While Pulling)',
      question: '별 모양 꼭짓점을 통과한 실을 위로 수직 견인하면 꼭짓점들은 어디로 모이나요?',
      hint: '주머니 끈(Drawstring) 원리입니다.',
      answerText: '루프의 둘레가 줄어들며 모든 꼭짓점이 단 하나의 공통 꼭짓점(각뿔의 꼭짓점)으로 수렴합니다.'
    },
    after: {
      stage: '3단계: 추론 및 응용 (After Pulling)',
      question: '이 다각뿔 돔 전개도와 동일한 메커니즘을 가진 우리 주변의 공학 제품은 무엇이 있을까요?',
      hint: '캠핑용 텐트, 비 오는 날 쓰는 물건입니다.',
      answerText: '캠핑 텐트의 원터치 폴대, 우산의 접힘 살대 구조, 건축물의 지오데식 돔(Geodesic Dome)과 원리가 같습니다.'
    }
  }
};

const QUIZ_DATABASE = [
  {
    id: 'q1',
    shapeId: 'triangular_prism',
    question: '삼각기둥의 구성 요소에 대한 설명으로 옳은 것은?',
    options: [
      '밑면은 1개이고 삼각형이다.',
      '밑면은 2개이고 서로 평행하며 합동인 정삼각형이다.',
      '옆면은 모두 정삼각형이다.',
      '꼭짓점은 총 8개이다.'
    ],
    answer: 1,
    explanation: '삼각기둥은 서로 평행하고 합동인 삼각형 밑면 2개와 직사각형 옆면 3개로 이루어져 있습니다 (꼭짓점 6개, 모서리 9개).'
  },
  {
    id: 'q2',
    shapeId: 'cuboid',
    question: '직육면체에서 서로 마주보는 두 면의 위치 관계와 특징은?',
    options: [
      '서로 수직으로 만난다.',
      '서로 평행하고 모양과 크기가 같다(합동).',
      '크기는 같지만 모양은 다르다.',
      '한 모서리를 공유하며 맞닿는다.'
    ],
    answer: 1,
    explanation: '직육면체는 마주보는 3쌍의 직사각형 면이 각각 서로 평행하며 크기와 모양이 같은 합동입니다.'
  },
  {
    id: 'q3',
    shapeId: 'cylinder',
    question: '원기둥 전개도에서 옆면 직사각형의 가로 길이는 무엇과 같을까요?',
    options: [
      '밑면 원의 지름',
      '밑면 원의 둘레 (원주 = 2πr)',
      '원기둥의 높이',
      '밑면 원의 넓이'
    ],
    answer: 1,
    explanation: '직사각형 옆면이 둥글게 감기며 밑면 원을 완전히 둘러싸므로, 옆면의 가로 길이는 밑면 원의 둘레(2πr)와 정확히 일치합니다.'
  },
  {
    id: 'q4',
    shapeId: 'dome',
    question: '별 모양 다각뿔 교구에서 실을 당겼을 때 일어나는 메커니즘은?',
    options: [
      '밑면이 반으로 접힌다.',
      '모든 삼각형의 꼭짓점이 하나의 점으로 수렴하여 뿔/돔을 형성한다.',
      '옆면 직사각형이 원형으로 말린다.',
      '꼭짓점 사이의 거리가 점점 멀어진다.'
    ],
    answer: 1,
    explanation: '폐곡선 실 루프를 당기면 모든 삼각형 꼭짓점이 단 하나의 각뿔 꼭짓점으로 모이면서 입체 돔이 완성됩니다.'
  }
];

class QuizManager {
  constructor() {
    this.currentShapeId = 'triangular_prism';
    this.activeStage = 'before';
  }

  setShape(shapeId) {
    this.currentShapeId = shapeId;
  }

  getInquiryData(stage = this.activeStage) {
    const shapeInquiry = INQUIRY_QUESTIONS[this.currentShapeId] || INQUIRY_QUESTIONS.triangular_prism;
    return shapeInquiry[stage];
  }

  getQuizzesForShape() {
    return QUIZ_DATABASE.filter(q => q.shapeId === this.currentShapeId);
  }
}

// 전역 등록
window.INQUIRY_QUESTIONS = INQUIRY_QUESTIONS;
window.QUIZ_DATABASE = QUIZ_DATABASE;
window.QuizManager = QuizManager;
