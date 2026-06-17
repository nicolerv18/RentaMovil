import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { useTheme } from "../../theme/useTheme";
import { themes } from "../../theme/themes";

import { useClientOnlyValue } from "../../shared/hooks/useClientOnlyValue";

type TabBarIconProps = Readonly<{
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}>;

function TabBarIcon(props: TabBarIconProps) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

function IndexTabBarIcon({
  color,
}: Readonly<{ color: string }>) {
  return (
    <TabBarIcon
      name="car"
      color={color}
    />
  );
}

function MenuTabBarIcon({
  color,
}: Readonly<{ color: string }>) {
  return (
    <TabBarIcon
      name="bars"
      color={color}
    />
  );
}

function HeaderRightButton() {
  const { themeName } = useTheme();
  const colors = themes[themeName];

  return (
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="user"
            size={25}
            color={colors.primary}
            style={{
              marginRight: 15,
              opacity: pressed ? 0.5 : 1,
            }}
          />
        )}
      </Pressable>
    </Link>
  );
}

export default function TabLayout() {
  const { themeName } = useTheme();
  const colors = themes[themeName];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,

        tabBarInactiveTintColor:
          colors.secondaryText,

        tabBarStyle: {
          backgroundColor:
            colors.background,

          borderTopColor:
            colors.border,
        },

        headerStyle: {
          backgroundColor:
            colors.background,
        },

        headerTintColor:
          colors.text,

        headerShown:
          useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Rentamóvil",
          tabBarLabel: "Inicio",
          tabBarIcon: IndexTabBarIcon,
          headerRight: HeaderRightButton,
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Rentamóvil",
          tabBarLabel: "Menú",
          tabBarIcon: MenuTabBarIcon,
        }}
      />
    </Tabs>
  );
}