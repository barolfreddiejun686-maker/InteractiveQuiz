import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Pressable,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Screen } from "../components/QuizParts";
import { colors } from "../constants/theme";
import { toNum } from "../data/quiz";

const R = 54;
const C = 2 * Math.PI * R;

// Sample breakdown — replace with real per-category stats
const BREAKDOWN = [
  { name: "Science", got: 4, of: 5, color: colors.cyan },
  { name: "History", got: 3, of: 3, color: colors.orange },
  { name: "Geography", got: 2, of: 2, color: "#3B82F6" },
];

export default function ResultsScreen() {
  const router = useRouter();
  const p = useLocalSearchParams<{
    score?: string;
    correct?: string;
    total?: string;
    streak?: string;
    category?: string;
  }>();
  const correct = toNum(p.correct);
  const total = toNum(p.total) || 1;
  const pct = correct / total;
  const headline =
    pct >= 0.8
      ? "Amazing Job, Genius!"
      : pct >= 0.5
        ? "Nice Work!"
        : "Keep Practicing!";

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
      >
        <View style={s.header}>
          <View>
            <Text style={s.title}>Results</Text>
            <Text style={s.muted}>Quiz Summary</Text>
          </View>
          <View style={s.avatar}>
            <Ionicons name="person" size={20} color={colors.text} />
          </View>
        </View>

        <View style={s.ringWrap}>
          <Svg width={140} height={140} viewBox="0 0 140 140">
            <Circle
              cx={70}
              cy={70}
              r={R}
              stroke={colors.card}
              strokeWidth={10}
              fill="none"
            />
            <Circle
              cx={70}
              cy={70}
              r={R}
              stroke={colors.green}
              strokeWidth={10}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${C * pct} ${C}`}
              rotation={-90}
              origin="70,70"
            />
          </Svg>
          <View style={s.ringText}>
            <Text style={s.pct}>{Math.round(pct * 100)}%</Text>
            <Text style={s.muted}>ACCURACY</Text>
          </View>
        </View>
        <Text style={s.headline}>{headline}</Text>

        <View style={s.statsRow}>
          <Stat
            icon="time-outline"
            value="3m 42s"
            label="Time Taken"
            color={colors.cyan}
          />
          <Stat
            icon="checkmark-circle-outline"
            value={`${correct} / ${total}`}
            label="Correct Answers"
            color={colors.green}
          />
          <Stat
            icon="flame-outline"
            value={`${toNum(p.streak)} Streak`}
            label="Final Streak"
            color={colors.gold}
          />
        </View>

        <Text style={s.section}>Category Breakdown</Text>
        <View style={s.card}>
          {BREAKDOWN.map((b) => (
            <View key={b.name} style={s.barRow}>
              <Text style={s.barLabel}>{b.name}</Text>
              <View style={s.track}>
                <View
                  style={{
                    width: `${(b.got / b.of) * 100}%`,
                    height: "100%",
                    backgroundColor: b.color,
                    borderRadius: 3,
                  }}
                />
              </View>
              <Text style={[s.barCount, { color: b.color }]}>
                {b.got}/{b.of}
              </Text>
            </View>
          ))}
        </View>

        <Pressable
          style={s.primary}
          onPress={() =>
            router.replace({
              pathname: "/quiz",
              params: { category: p.category ?? "science" },
            })
          }
        >
          <Text style={s.primaryText}>Play Again</Text>
        </Pressable>
        <Pressable
          style={s.secondary}
          onPress={() =>
            Share.share({
              message: `I scored ${Math.round(pct * 100)}% on Quizly! (${correct}/${total})`,
            })
          }
        >
          <Ionicons name="share-outline" size={18} color={colors.text} />
          <Text style={s.secondaryText}>Share Score</Text>
        </Pressable>
        <Pressable
          style={{ alignItems: "center", marginTop: 16 }}
          onPress={() => router.replace("/")}
        >
          <Text style={s.muted}>Back to home</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function Stat(props: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  value: string;
  label: string;
  color: string;
}) {
  return (
    <View style={s.stat}>
      <Ionicons name={props.icon} size={20} color={props.color} />
      <Text style={s.statValue}>{props.value}</Text>
      <Text style={s.statLabel}>{props.label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: "700" },
  muted: { color: colors.muted, fontSize: 12 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2A3470",
    borderWidth: 2,
    borderColor: colors.cyan,
    alignItems: "center",
    justifyContent: "center",
  },
  ringWrap: {
    alignSelf: "center",
    marginTop: 28,
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  ringText: { position: "absolute", alignItems: "center" },
  pct: { color: colors.text, fontSize: 28, fontWeight: "800" },
  headline: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 16,
  },
  statsRow: { flexDirection: "row", gap: 10, marginTop: 24 },
  stat: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    gap: 4,
  },
  statValue: { color: colors.text, fontSize: 14, fontWeight: "800" },
  statLabel: { color: colors.muted, fontSize: 10 },
  section: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  barRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  barLabel: { width: 76, color: colors.text, fontSize: 12 },
  track: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  barCount: { width: 30, fontSize: 12, fontWeight: "700", textAlign: "right" },
  primary: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.cyan,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  primaryText: { color: "#04222A", fontSize: 15, fontWeight: "800" },
  secondary: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  secondaryText: { color: colors.text, fontSize: 15, fontWeight: "700" },
});
