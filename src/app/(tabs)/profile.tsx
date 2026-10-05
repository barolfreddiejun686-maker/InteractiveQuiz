import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Screen } from '../../components/QuizParts';
import { colors } from '../../constants/theme';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

const STATS = [
  { value: '2.4k', label: 'Total XP', color: colors.gold },
  { value: '48', label: 'Played', color: colors.cyan },
  { value: '#12', label: 'Rank', color: colors.pink },
];
const BADGES: { icon: Icon; label: string; color: string }[] = [
  { icon: 'flash-outline', label: 'Fast Learner', color: colors.gold },
  { icon: 'planet-outline', label: 'Scientist', color: colors.cyan },
  { icon: 'musical-notes-outline', label: 'Star', color: colors.pink },
];

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <View style={s.topBar}>
          <View style={{ width: 38 }} />
          <Text style={s.title}>Profile</Text>
          <Pressable style={s.circle} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={18} color={colors.text} />
          </Pressable>
        </View>

        <View style={s.hero}>
          <View style={s.avatar}><Ionicons name="person" size={40} color={colors.text} /></View>
          <Text style={s.name}>Smartypants</Text>
          <Text style={s.muted}>Level 12 • Quiz Legend</Text>
        </View>

        <View style={s.xpRow}>
          <Text style={s.muted}>1,240 XP</Text>
          <Text style={s.muted}>2,000 XP</Text>
        </View>
        <View style={s.track}><View style={[s.fill, { width: '62%' }]} /></View>

        <View style={s.statsRow}>
          {STATS.map((x) => (
            <View key={x.label} style={s.stat}>
              <Text style={[s.statValue, { color: x.color }]}>{x.value}</Text>
              <Text style={s.statLabel}>{x.label}</Text>
            </View>
          ))}
        </View>

        <View style={s.sectionRow}>
          <Text style={s.section}>Achievements</Text>
          <Text style={s.link}>View All</Text>
        </View>
        <View style={s.badges}>
          {BADGES.map((b) => (
            <View key={b.label} style={s.badge}>
              <View style={[s.badgeIcon, { backgroundColor: b.color + '26' }]}>
                <Ionicons name={b.icon} size={22} color={b.color} />
              </View>
              <Text style={s.statLabel}>{b.label}</Text>
            </View>
          ))}
        </View>

        <Text style={[s.section, { marginTop: 24, marginBottom: 12 }]}>Recent Quizzes</Text>
        <View style={s.recent}>
          <View style={[s.badgeIcon, { backgroundColor: '#3B82F626' }]}>
            <Ionicons name="map-outline" size={20} color="#3B82F6" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.recentTitle}>Geography Master</Text>
            <Text style={s.statLabel}>Yesterday • 10/10 correct</Text>
          </View>
          <Text style={[s.statLabel, { color: colors.green, fontWeight: '700' }]}>+150 XP</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  title: { color: colors.text, fontSize: 17, fontWeight: '700' },
  circle: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  hero: { alignItems: 'center', marginTop: 20 },
  avatar: { width: 92, height: 92, borderRadius: 46, borderWidth: 3, borderColor: colors.pink, backgroundColor: '#2A3470', alignItems: 'center', justifyContent: 'center' },
  name: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 12 },
  muted: { color: colors.muted, fontSize: 11 },
  xpRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 6 },
  track: { height: 6, borderRadius: 3, backgroundColor: colors.card, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.cyan },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  stat: { flex: 1, backgroundColor: colors.card, borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800' },
  statLabel: { color: colors.muted, fontSize: 10, marginTop: 2 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 12 },
  section: { color: colors.text, fontSize: 15, fontWeight: '700' },
  link: { color: colors.cyan, fontSize: 11 },
  badges: { flexDirection: 'row', gap: 10 },
  badge: { flex: 1, backgroundColor: colors.card, borderRadius: 14, paddingVertical: 14, alignItems: 'center', gap: 8 },
  badgeIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  recent: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: 14, padding: 12 },
  recentTitle: { color: colors.text, fontSize: 13, fontWeight: '700' },
});