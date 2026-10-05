import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Screen } from '../components/QuizParts';
import { colors } from '../constants/theme';

type Icon = React.ComponentProps<typeof Ionicons>['name'];

function Row(props: { icon: Icon; label: string; onPress?: () => void; toggle?: { value: boolean; set: (v: boolean) => void } }) {
  return (
    <Pressable style={s.row} onPress={props.onPress} disabled={!props.onPress}>
      <Ionicons name={props.icon} size={18} color={colors.cyan} />
      <Text style={s.rowLabel}>{props.label}</Text>
      {props.toggle ? (
        <Switch
          value={props.toggle.value}
          onValueChange={props.toggle.set}
          trackColor={{ false: colors.border, true: colors.cyan }}
          thumbColor="#fff"
        />
      ) : (
        <Ionicons name="chevron-forward" size={16} color={colors.muted} />
      )}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(false);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        <View style={s.topBar}>
          <Pressable style={s.circle} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </Pressable>
          <Text style={s.title}>Settings</Text>
          <View style={{ width: 38 }} />
        </View>

        <View style={s.profileCard}>
          <View style={s.avatar}><Ionicons name="person" size={20} color={colors.text} /></View>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>Smartypants</Text>
            <Text style={s.muted}>Level 12 • 1,240 XP</Text>
          </View>
          <Ionicons name="flash-outline" size={20} color={colors.gold} />
        </View>

        <Text style={s.group}>ACCOUNT</Text>
        <View style={s.card}>
          <Row icon="person-outline" label="Edit Profile" onPress={() => {}} />
          <Row icon="lock-closed-outline" label="Change Password" onPress={() => {}} />
          <Row icon="link-outline" label="Linked Accounts" onPress={() => {}} />
        </View>

        <Text style={s.group}>PREFERENCES</Text>
        <View style={s.card}>
          <Row icon="notifications-outline" label="Notifications" toggle={{ value: notifications, set: setNotifications }} />
          <Row icon="volume-high-outline" label="Sound Effects" toggle={{ value: sound, set: setSound }} />
          <Row icon="musical-notes-outline" label="Music" toggle={{ value: music, set: setMusic }} />
        </View>

        <Text style={s.group}>SUPPORT</Text>
        <View style={s.card}>
          <Row icon="help-circle-outline" label="Help Center" onPress={() => {}} />
          <Row icon="shield-checkmark-outline" label="Privacy Policy" onPress={() => {}} />
          <Row icon="information-circle-outline" label="About Quizly" onPress={() => {}} />
        </View>

        <Pressable onPress={() => { /* sign out here */ }}>
          <LinearGradient colors={[colors.orange, colors.pink]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.logout}>
            <Ionicons name="log-out-outline" size={18} color="#fff" />
            <Text style={s.logoutText}>Logout</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const s = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  circle: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.text, fontSize: 17, fontWeight: '700' },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: 16, padding: 14, marginTop: 20 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2A3470', alignItems: 'center', justifyContent: 'center' },
  name: { color: colors.text, fontSize: 14, fontWeight: '700' },
  muted: { color: colors.muted, fontSize: 11 },
  group: { color: colors.muted, fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginTop: 22, marginBottom: 8 },
  card: { backgroundColor: colors.card, borderRadius: 16, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 50 },
  rowLabel: { flex: 1, color: colors.text, fontSize: 13 },
  logout: { height: 52, borderRadius: 14, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 28 },
  logoutText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});