import React from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AnswerSheet, OptionRow, Progress, QuestionCard, Screen, TimerCircle, TopBar } from '../components/QuizParts';
import { CATEGORY_LABELS, QuizParams, getQuestions, goNext, toNum } from '../data/quiz';
import { colors } from '../constants/theme';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function AnswerWrongScreen() {
  const router = useRouter();
  const p = useLocalSearchParams<QuizParams>();
  const category = p.category ?? 'science';
  const i = toNum(p.i);
  const pick = p.pick === undefined ? -1 : Number(p.pick); 
  const questions = getQuestions(category);
  const q = questions[i];
  const last = i + 1 >= questions.length;

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 340 }}>
        <TopBar label={CATEGORY_LABELS[category] ?? 'Quiz'} right={<TimerCircle text="–" active={false} />} />
        <Progress index={i} total={questions.length} done={i + 1} rightText="Streak lost!" rightColor={colors.red} />
        <QuestionCard text={q.text} />
        <View style={{ marginTop: 22, gap: 12 }}>
          {q.options.map((opt, idx) => (
            <OptionRow
              key={opt}
              letter={LETTERS[idx]}
              text={opt}
              state={idx === q.correctIndex ? 'correct' : idx === pick ? 'wrong' : 'idle'}
            />
          ))}
        </View>
      </ScrollView>
      <AnswerSheet
        ok={false}
        title={pick === -1 ? "Time's up!" : 'Ouch, Not Quite!'}
        badge={`${q.options[q.correctIndex]} is correct`}
        explanation={q.explanation}
        button={last ? 'See Results' : 'Next Question'}
        onNext={() => goNext(router, { category, i, score: toNum(p.score), streak: 0, correct: toNum(p.correct) })}
      />
    </Screen>
  );
}