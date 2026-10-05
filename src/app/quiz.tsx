import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { OptionRow, Progress, QuestionCard, Screen, TimerCircle, TopBar } from '../components/QuizParts';
import { CATEGORY_LABELS, POINTS, QuizParams, SECONDS, getQuestions, toNum } from '../data/quiz';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen() {
  const router = useRouter();
  const p = useLocalSearchParams<QuizParams>();
  const category = p.category ?? 'science';
  const i = toNum(p.i);
  const questions = getQuestions(category);
  const q = questions[i];

  const [timeLeft, setTimeLeft] = useState(SECONDS);

  const answer = (pick: number) => {
    const ok = pick === q.correctIndex;
    const score = toNum(p.score) + (ok ? POINTS : 0);
    const correct = toNum(p.correct) + (ok ? 1 : 0);
    const streak = ok ? toNum(p.streak) + 1 : 0;
    router.replace({
      pathname: ok ? '/answer-correct' : '/answer-wrong',
      params: { category, i: String(i), pick: String(pick), score: String(score), correct: String(correct), streak: String(streak) },
    });
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      answer(-1); // timed out counts as wrong
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <TopBar label={CATEGORY_LABELS[category] ?? 'Quiz'} right={<TimerCircle text={timeLeft} active />} />
        <Progress index={i} total={questions.length} done={i} rightText={`+${POINTS} pts`} />
        <QuestionCard text={q.text} />
        <View style={{ marginTop: 22, gap: 12 }}>
          {q.options.map((opt, idx) => (
            <OptionRow key={opt} letter={LETTERS[idx]} text={opt} onPress={() => answer(idx)} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}