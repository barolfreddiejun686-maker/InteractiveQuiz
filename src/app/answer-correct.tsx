import React from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AnswerSheet, OptionRow, Progress, QuestionCard, Screen, TimerCircle, TopBar } from '../components/QuizParts';
import { CATEGORY_LABELS, POINTS, QuizParams, getQuestions, goNext, toNum } from '../data/quiz';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function AnswerCorrectScreen() {
  const router = useRouter();
  const p = useLocalSearchParams<QuizParams>();
  const category = p.category ?? 'science';
  const i = toNum(p.i);
  const questions = getQuestions(category);
  const q = questions[i];
  const streak = toNum(p.streak);
  const last = i + 1 >= questions.length;

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 280 }}>
        <TopBar label={CATEGORY_LABELS[category] ?? 'Quiz'} right={<TimerCircle text="–" active={false} />} />
        <Progress index={i} total={questions.length} done={i + 1} rightText={`+${POINTS} pts`} />
        <QuestionCard text={q.text} />
        <View style={{ marginTop: 22, gap: 12 }}>
          {q.options.map((opt, idx) => (
            <OptionRow key={opt} letter={LETTERS[idx]} text={opt} state={idx === q.correctIndex ? 'correct' : 'idle'} />
          ))}
        </View>
      </ScrollView>
      <AnswerSheet
        ok
        title="Brilliant Answer!"
        badge={`+${POINTS} XP`}
        body={`Spot on! You now have a streak of ${streak} correct ${streak === 1 ? 'answer' : 'answers'}. Keep going!`}
        button={last ? 'See Results' : 'Next Question'}
        onNext={() => goNext(router, { category, i, score: toNum(p.score), streak, correct: toNum(p.correct) })}
      />
    </Screen>
  );
}