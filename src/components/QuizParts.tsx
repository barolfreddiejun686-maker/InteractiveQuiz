import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../constants/theme";

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={["top"]}
    >
      {children}
    </SafeAreaView>
  );
}

export function TopBar({
  label,
  right,
}: {
  label: string;
  right: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <View style={s.topBar}>
      <Pressable style={s.circle} onPress={() => router.replace("/(tabs)")}>
        <Ionicons name="arrow-back" size={20} color={colors.text} />
      </Pressable>
      <View style={s.pill}>
        <View style={s.dot} />
        <Text style={s.pillText}>{label}</Text>
      </View>
      {right}
    </View>
  );
}

export function TimerCircle({
  text,
  active,
}: {
  text: string | number;
  active: boolean;
}) {
  return (
    <View
      style={[
        s.circle,
        { borderWidth: 2, borderColor: active ? colors.cyan : colors.border },
      ]}
    >
      <Text style={s.timerText}>{text}</Text>
    </View>
  );
}

export function Progress(props: {
  index: number;
  total: number;
  done: number; // completed questions
  rightText: string;
  rightColor?: string;
}) {
  return (
    <>
      <View style={s.progressRow}>
        <Text style={s.muted}>
          Question {props.index + 1} of {props.total}
        </Text>
        <Text style={[s.right, { color: props.rightColor ?? colors.cyan }]}>
          {props.rightText}
        </Text>
      </View>
      <View style={s.track}>
        <View
          style={[s.fill, { width: `${(props.done / props.total) * 100}%` }]}
        />
      </View>
    </>
  );
}

export function QuestionCard({ text }: { text: string }) {
  return (
    <View style={s.questionCard}>
      <Text style={s.questionText}>{text}</Text>
    </View>
  );
}

export function OptionRow(props: {
  letter: string;
  text: string;
  state?: "idle" | "correct" | "wrong";
  onPress?: () => void;
}) {
  const { state = "idle" } = props;
  const accent =
    state === "correct" ? colors.green : state === "wrong" ? colors.red : null;
  return (
    <Pressable
      disabled={!props.onPress}
      onPress={props.onPress}
      style={({ pressed }) => [
        s.option,
        state === "correct" && {
          borderColor: colors.green,
          backgroundColor: colors.greenBg,
        },
        state === "wrong" && {
          borderColor: colors.red,
          backgroundColor: colors.redBg,
        },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={[s.letterBox, accent ? { backgroundColor: accent } : null]}>
        <Text style={s.letter}>{props.letter}</Text>
      </View>
      <Text style={s.optionText}>{props.text}</Text>
      {state === "correct" && (
        <Ionicons name="checkmark" size={20} color={colors.green} />
      )}
      {state === "wrong" && (
        <Ionicons name="close-circle-outline" size={20} color={colors.red} />
      )}
    </Pressable>
  );
}

export function AnswerSheet(props: {
  ok: boolean;
  title: string;
  badge?: string;
  body?: string;
  explanation?: string;
  button: string;
  onNext: () => void;
}) {
  const insets = useSafeAreaInsets();
  const accent = props.ok ? colors.green : colors.red;
  return (
    <View
      style={[
        s.sheet,
        { borderTopColor: accent, paddingBottom: Math.max(insets.bottom, 20) },
      ]}
    >
      <View style={s.sheetHeader}>
        <View style={[s.sheetIcon, { backgroundColor: accent }]}>
          <Ionicons
            name={props.ok ? "checkmark" : "close"}
            size={18}
            color="#fff"
          />
        </View>
        <Text style={[s.sheetTitle, { color: accent }]}>{props.title}</Text>
        {props.badge && (
          <View style={[s.badge, { backgroundColor: accent + "2E" }]}>
            <Text style={[s.badgeText, { color: accent }]}>{props.badge}</Text>
          </View>
        )}
      </View>
      {props.body && <Text style={s.sheetBody}>{props.body}</Text>}
      {props.explanation && (
        <View style={s.explain}>
          <Text style={s.explainLabel}>EXPLANATION</Text>
          <Text style={s.explainText}>{props.explanation}</Text>
        </View>
      )}
      <Pressable
        onPress={props.onNext}
        style={[s.next, { backgroundColor: accent }]}
      >
        <Text style={[s.nextText, !props.ok && { color: "#fff" }]}>
          {props.button}
        </Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 20,
  },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(34,211,238,0.12)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.cyan },
  pillText: { color: colors.cyan, fontSize: 12, fontWeight: "700" },
  timerText: { color: colors.text, fontSize: 12, fontWeight: "700" },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  muted: { color: colors.muted, fontSize: 12 },
  right: { fontSize: 12, fontWeight: "700" },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.card,
    overflow: "hidden",
  },
  fill: { height: "100%", backgroundColor: colors.cyan, borderRadius: 3 },
  questionCard: {
    marginTop: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 28,
    minHeight: 130,
    justifyContent: "center",
  },
  questionText: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 26,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    height: 56,
    paddingHorizontal: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
  },
  letterBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#2A3470",
    alignItems: "center",
    justifyContent: "center",
  },
  letter: { color: colors.text, fontSize: 12, fontWeight: "700" },
  optionText: { flex: 1, color: colors.text, fontSize: 14, fontWeight: "600" },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.sheet,
    borderTopWidth: 3,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sheetHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  sheetIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetTitle: { flex: 1, fontSize: 17, fontWeight: "800" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: "700" },
  sheetBody: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
  explain: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 12,
  },
  explainLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 4,
  },
  explainText: { color: colors.text, fontSize: 12, lineHeight: 18 },
  next: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  nextText: { color: "#06140C", fontSize: 15, fontWeight: "800" },
});
