import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/QuizParts";
import { colors } from "../../constants/theme";
import { LEADERS } from "../../data/quiz";

type Leader = (typeof LEADERS)[number];

export default function LeaderboardScreen() {
  const [range, setRange] = useState<"Weekly" | "All Time">("Weekly");
  const [first, second, third] = LEADERS;
  const rest = LEADERS.slice(3);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
      >
        <Text style={s.title}>Leaderboard</Text>
        <Text style={s.muted}>{range} Ranking</Text>

        <View style={s.segment}>
          {(["Weekly", "All Time"] as const).map((r) => (
            <Pressable
              key={r}
              onPress={() => setRange(r)}
              style={[s.segBtn, range === r && s.segActive]}
            >
              <Text style={[s.segText, range === r && { color: colors.text }]}>
                {r}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={s.podium}>
          <Podium user={second} height={110} color="#94A3B8" />
          <Podium user={first} height={140} color={colors.gold} crown />
          <Podium user={third} height={96} color="#CD7F32" />
        </View>

        <View style={{ gap: 10, marginTop: 20 }}>
          {rest.map((u) => (
            <View key={u.rank} style={[s.row, u.me && s.rowMe]}>
              <Text style={s.rank}>{u.rank}</Text>
              <View style={s.avatar}>
                <Ionicons name="person" size={16} color={colors.text} />
              </View>
              <Text style={s.name}>{u.name}</Text>
              <Text style={s.pts}>{u.pts.toLocaleString()} pts</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

function Podium({
  user,
  height,
  color,
  crown,
}: {
  user: Leader;
  height: number;
  color: string;
  crown?: boolean;
}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
      {crown && <Ionicons name="trophy" size={20} color={colors.gold} />}
      <View style={[s.podiumAvatar, { borderColor: color }]}>
        <Ionicons name="person" size={22} color={colors.text} />
      </View>
      <Text style={s.podiumName}>{user.name}</Text>
      <Text style={s.muted}>{user.pts.toLocaleString()} pts</Text>
      <View
        style={[
          s.podiumBlock,
          { height, backgroundColor: color + "33", borderColor: color },
        ]}
      >
        <Text style={[s.podiumRank, { color }]}>{user.rank}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  title: { color: colors.text, fontSize: 20, fontWeight: "700", marginTop: 12 },
  muted: { color: colors.muted, fontSize: 11 },
  segment: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
    marginTop: 16,
  },
  segBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 9,
    alignItems: "center",
  },
  segActive: { backgroundColor: "#2A3470" },
  segText: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  podium: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginTop: 24,
  },
  podiumAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: "#2A3470",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  podiumName: { color: colors.text, fontSize: 12, fontWeight: "700" },
  podiumBlock: {
    width: "100%",
    marginTop: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 1,
    borderBottomWidth: 0,
    alignItems: "center",
    paddingTop: 8,
  },
  podiumRank: { fontSize: 20, fontWeight: "800" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  rowMe: { borderColor: colors.cyan },
  rank: {
    width: 18,
    color: colors.muted,
    fontWeight: "700",
    textAlign: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2A3470",
    alignItems: "center",
    justifyContent: "center",
  },
  name: { flex: 1, color: colors.text, fontSize: 13, fontWeight: "700" },
  pts: { color: colors.cyan, fontSize: 12, fontWeight: "700" },
});
