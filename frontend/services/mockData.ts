import { Post } from '../types';

export const MOCK_POSTS: Post[] = [
  {
    id: 'post_01',
    title: '3교대 근무하며 3개월 만에 독학 합격한 후기 (직장인 필독)',
    author: 'RN_Dreamer',
    passStatus: 'Pass',
    examDate: '2024-05-15',
    studyPeriod: '3 months',
    studyPeriodMonths: 3,
    baseInfo: {
      experience: '5 Years',
      englishLevel: 'Medium',
      isWorking: true,
    },
    resources: ['Archer', 'UWorld', 'Mark Klimek'],
    content: `
### 공부 배경
임상 5년차, 3교대 근무를 병행하면서 준비했습니다. 절대적인 공부 시간이 부족했기 때문에 효율성을 최우선으로 두었습니다.

### 공부 방법
1. **Archer**: 개념 잡기에 좋습니다. 강의가 지루할 수 있지만 1배속으로 꼼꼼히 들었습니다.
2. **UWorld**: 문제 풀이의 핵심입니다. 해설이 정말 교과서 수준이라 오답노트를 따로 만들지 않고 해설을 정독했습니다.
3. **Mark Klimek**: 출퇴근 시간에 오디오 강의를 반복해서 들었습니다.

### 멘탈 관리
근무 끝나고 공부하는 게 정말 힘들었지만, 하루 50문제는 무조건 푼다는 원칙을 지켰습니다.
    `,
    centerTips: '피어슨 센터(서울) 에어컨이 꽤 강합니다. 얇은 가디건 꼭 챙겨가세요. 간식으로는 초콜릿과 물만 허용됩니다.',
    viewCount: 1240,
    likes: 145,
    createdAt: '2024-05-20',
    isVerified: true,
  },
  {
    id: 'post_02',
    title: '영어 노베이스 신규 간호사의 6개월 대장정',
    author: 'NewGrad2024',
    passStatus: 'Pass',
    examDate: '2024-04-10',
    studyPeriod: '6 months',
    studyPeriodMonths: 6,
    baseInfo: {
      experience: 'New Grad',
      englishLevel: 'Low',
      isWorking: false,
    },
    resources: ['Saunders', 'UWorld'],
    content: `
### 영어 실력
토익 600점대라 영어 해석부터 난관이었습니다. 처음엔 문제 해석에만 5분이 걸렸어요.

### 사운더스(Saunders) 활용
기본서 회독을 2번 했습니다. 처음엔 모르는 단어를 다 찾느라 힘들었지만, 2회독부터는 속도가 붙더군요.

### UWorld
처음 정답률 40%.. 절망했지만 실제 시험은 UWorld보다 직관적입니다. 걱정 마세요!
    `,
    viewCount: 850,
    likes: 67,
    createdAt: '2024-04-15',
    isVerified: true,
  },
  {
    id: 'post_03',
    title: '재시험 끝에 75문제 합격! (Fail 후 멘탈 관리법)',
    author: 'NeverGiveUp',
    passStatus: 'Pass',
    examDate: '2024-06-01',
    studyPeriod: '4 months',
    studyPeriodMonths: 4,
    baseInfo: {
      experience: '2 Years',
      englishLevel: 'High',
      isWorking: true,
    },
    resources: ['Archer', 'SimpleNursing'],
    content: `
### 첫 시험 탈락 요인
너무 긴장했고, 모르는 문제가 나왔을 때 당황해서 페이스를 잃었습니다.

### 재도전 전략
Archer의 CAT 모드를 매일 돌렸습니다. 실제 시험과 화면 구성이 비슷해서 긴장감 완화에 도움이 되었습니다.
SimpleNursing 유튜브 채널을 통해 약물 파트(Pharmacology)를 완벽히 정리했습니다.
    `,
    centerTips: '오사카 센터에서 봤습니다. 한국보다 분위기가 좀 더 자유로운 느낌? 여권 만료일 꼭 확인하세요!',
    viewCount: 2300,
    likes: 312,
    createdAt: '2024-06-03',
    isVerified: true,
  },
  {
    id: 'post_04',
    title: '육아맘의 하루 2시간 공부법 (총 1년 소요)',
    author: 'MomNurse',
    passStatus: 'Pass',
    examDate: '2024-05-30',
    studyPeriod: '12 months',
    studyPeriodMonths: 12,
    baseInfo: {
      experience: '10+ Years',
      englishLevel: 'Medium',
      isWorking: false,
    },
    resources: ['UWorld', 'Mark Klimek'],
    content: `
아기가 잘 때만 공부할 수 있어서 기간을 길게 잡았습니다.
하루 2시간 집중이 하루 8시간 멍때리는 것보다 낫습니다.
Mark Klimek 강의 노트는 필수입니다. 프린트해서 주방 벽에 붙여놓고 외웠어요.
    `,
    viewCount: 540,
    likes: 89,
    createdAt: '2024-06-01',
    isVerified: false,
  },
];