import React, { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { destinations } from "../data/mockData";
import { RootStackParamList } from "../navigation/types";
import { colors, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

export default function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return destinations;
    }
    return destinations.filter((destination) => destination.name.toLowerCase().includes(term));
  }, [query]);

  const recent = destinations.filter((destination) => destination.recent);

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Search" subtitle="Find an indoor or campus destination" onBack={navigation.goBack} />
      <View style={styles.searchPad}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search campus locations"
          autoFocus
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Recent destinations</Text>
        <View style={styles.stack}>
          {recent.map((destination) => (
            <DestinationRow
              key={destination.id}
              title={destination.name}
              meta={`${destination.building} - ${destination.floor}`}
              onPress={() => navigation.navigate("RoutePreview", { destinationId: destination.id })}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Popular locations</Text>
        <View style={styles.stack}>
          {filtered.map((destination) => (
            <DestinationRow
              key={destination.id}
              title={destination.name}
              meta={`${destination.category} - ${destination.eta}`}
              onPress={() => navigation.navigate("RoutePreview", { destinationId: destination.id })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type RowProps = {
  title: string;
  meta: string;
  onPress: () => void;
};

function DestinationRow({ title, meta, onPress }: RowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.locationIcon}>
        <Ionicons name="location-outline" size={22} color={colors.accentDark} />
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowMeta}>{meta}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.faint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background
  },
  searchPad: {
    paddingHorizontal: spacing.lg
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginTop: spacing.md,
    marginBottom: spacing.md
  },
  stack: {
    gap: spacing.md
  },
  row: {
    minHeight: 72,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center"
  },
  rowBody: {
    flex: 1
  },
  rowTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  rowMeta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2
  }
});

