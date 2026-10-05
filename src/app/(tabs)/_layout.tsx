import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../../constants/theme";

type IconName = keyof typeof Ionicons.glyphMap;

const icon =
  (name: IconName) =>
  ({ color, size }: { color: string; size?: number }) => (
    <Ionicons name={name} size={size ?? 24} color={color} />
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.cyan,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: "#0E1640",
          borderTopColor: "rgba(255,255,255,0.06)",
        },
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Play",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Rank",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
