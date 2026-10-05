import type { useRouter } from 'expo-router';

type AppRouter = ReturnType<typeof useRouter>;

export type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const POINTS = 150;
export const SECONDS = 15;

export const CATEGORY_LABELS: Record<string, string> = {
  science: 'Science',
  history: 'History',
  'pop-culture': 'Pop Culture',
  sports: 'Sports',
  geography: 'Geography',
  art: 'Art',
  'daily-clash': 'Daily Clash',
};


const SCIENCE: Question[] = [
  {
    id: 's1',
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctIndex: 1,
    explanation: 'Mars looks red because its surface is covered in iron oxide, better known as rust.',
  },
  {
    id: 's2',
    text: 'Which of the following planets in our solar system has retrograde rotation, meaning it rotates clockwise?',
    options: ['Jupiter', 'Venus', 'Neptune', 'Mercury'],
    correctIndex: 1,
    explanation:
      'Venus is the only planet in our solar system that rotates clockwise on its axis. Every other planet rotates counterclockwise.',
  },
  {
    id: 's3',
    text: 'What is the chemical symbol for gold?',
    options: ['Ag', 'Gd', 'Au', 'Go'],
    correctIndex: 2,
    explanation: 'Au comes from the Latin word for gold, "aurum".',
  },
];

// Add the other categories here, keyed by the ids used on the home screen
export const QUESTIONS: Record<string, Question[]> = { science: SCIENCE };
export const getQuestions = (category?: string) => QUESTIONS[category ?? ''] ?? SCIENCE;



// Params travel between quiz screens as strings
export type QuizParams = {
  category?: string;
  i?: string;
  score?: string;
  streak?: string;
  correct?: string;
  pick?: string;
};
export const toNum = (v?: string) => Number(v ?? 0) || 0;

export function goNext(
  router: AppRouter,
  p: { category: string; i: number; score: number; streak: number; correct: number }
) {
  const total = getQuestions(p.category).length;
  const params = {
    category: p.category,
    score: String(p.score),
    streak: String(p.streak),
    correct: String(p.correct),
  };
  if (p.i + 1 >= total) {
    router.replace({ pathname: '/results', params: { ...params, total: String(total) } });
  } else {
    router.replace({ pathname: '/quiz', params: { ...params, i: String(p.i + 1) } });
  }
}

export const LEADERS = [
  { rank: 1, name: 'Alex', pts: 2850, me: false },
  { rank: 2, name: 'Sarah', pts: 2600, me: false },
  { rank: 3, name: 'Wang', pts: 2450, me: false },
  { rank: 4, name: 'Jessica', pts: 2400, me: false },
  { rank: 5, name: 'Marco', pts: 2280, me: false },
  { rank: 6, name: 'Dave', pts: 1920, me: false },
  { rank: 7, name: 'Michelle (You)', pts: 1850, me: true },
];