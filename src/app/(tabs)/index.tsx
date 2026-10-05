import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type IconName = keyof typeof Ionicons.glyphMap;

type Category = {
  id: string;
  title: string;
  count: number;
  icon: IconName;
  color: string;
};

const COLORS = {
  bg: "#070E2E",
  card: "#121A45",
  textPrimary: "#FFFFFF",
  textMuted: "#8F9BC4",
  tabBar: "#0E1640",
};

const CATEGORIES: Category[] = [
  {
    id: "science",
    title: "Science",
    count: 15,
    icon: "planet-outline",
    color: "#22D3EE",
  },
  {
    id: "history",
    title: "History",
    count: 12,
    icon: "book-outline",
    color: "#F59E0B",
  },
  {
    id: "pop-culture",
    title: "Pop Culture",
    count: 20,
    icon: "musical-notes-outline",
    color: "#EC4899",
  },
  {
    id: "sports",
    title: "Sports",
    count: 10,
    icon: "close-circle-outline",
    color: "#14B8A6",
  },
  {
    id: "geography",
    title: "Geography",
    count: 15,
    icon: "map-outline",
    color: "#3B82F6",
  },
  {
    id: "art",
    title: "Art",
    count: 12,
    icon: "brush-outline",
    color: "#8B5CF6",
  },
];

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.appName}>Quizly</Text>
        <Text style={styles.level}>Level 12 • Smartypants</Text>
      </View>
      <Pressable style={styles.avatar}>
        {/* Replace with your user's avatar */}
        <Ionicons name="person" size={20} color={COLORS.textPrimary} />
      </Pressable>
    </View>
  );
}

function DailyClashBanner({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={["#F97316", "#EC4899"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <View style={styles.bannerText}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>DAILY CLASH</Text>
          </View>
          <Text style={styles.bannerTitle}>Win Double XP today!</Text>
          <Text style={styles.bannerSub}>
            Test your mind with 10 random mixed questions.
          </Text>
        </View>
        <View style={styles.bannerIcon}>
          <Ionicons name="flash-outline" size={40} color="#FBBF24" />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function CategoryCard({
  category,
  onPress,
}: {
  category: Category;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.categoryCard,
        {
          borderColor: category.color + "66",
          shadowColor: category.color,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.categoryIcon,
          { backgroundColor: category.color + "26" },
        ]}
      >
        <Ionicons name={category.icon} size={22} color={category.color} />
      </View>
      <View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryCount}>{category.count} Questions</Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  const openQuiz = (categoryId: string) => {
    router.push({ pathname: "/quiz", params: { category: categoryId } });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <DailyClashBanner onPress={() => openQuiz("daily-clash")} />

        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.grid}>
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              onPress={() => openQuiz(c.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { paddingHorizontal: 20, paddingBottom: 24 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  appName: { color: COLORS.textPrimary, fontSize: 20, fontWeight: "700" },
  level: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2A3470",
    borderWidth: 2,
    borderColor: "#22D3EE",
    alignItems: "center",
    justifyContent: "center",
  },

  banner: {
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerText: { flex: 1, paddingRight: 12 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  bannerTitle: { color: "#fff", fontSize: 19, fontWeight: "800" },
  bannerSub: { color: "rgba(255,255,255,0.9)", fontSize: 11, marginTop: 6 },
  bannerIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  categoryCard: {
    width: "48%",
    height: 116,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    justifyContent: "space-between",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: { color: COLORS.textPrimary, fontSize: 14, fontWeight: "700" },
  categoryCount: { color: COLORS.textMuted, fontSize: 11, marginTop: 2 },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.tabBar,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    paddingTop: 10,
  },
  tabItem: { alignItems: "center", gap: 4, minWidth: 64 },
  tabLabel: { color: COLORS.textMuted, fontSize: 11 },
});
