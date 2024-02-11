import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "@/features/home_screen/index";
import { SCREEN_NAME } from "@/global/constants/screens";
import { FontFamilyConstants } from "@/global/theme/font_family";
import { FontSizeConstants } from "@/global/theme/font_size";
import { colors } from "@/global/theme/pallete";
import { hp } from "@/global/utils/responsive";
import i18n from "@/localization/i18n";
import HistoryScreen from "@/features/history_screen";
import GuideScreen from "@/features/guide_screen";
import { useAppDispatch } from "@/global/hooks/redux";
import { loadDownloadedList } from "@/redux/thunks";

const Tab = createBottomTabNavigator();

const tabElementStyle = {
  tabBarLabelStyle: {
    fontFamily: FontFamilyConstants.ManRope.bold,
    fontSize: FontSizeConstants.xs,
  },
};
export default function HomeZone() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.colors.bnv_active,
          tabBarInactiveTintColor: colors.colors.bnv_inactive,
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "transparent",
          },
          tabBarBackground: () => (
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={Platform.select({
                ios: 10,
                default: 60,
              })}
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                backgroundColor: "transparent",
              }}
            />
          ),
        }}
        initialRouteName={SCREEN_NAME.home_feed}
        safeAreaInsets={Platform.select({
          android: { bottom: hp(1) },
          ios: undefined,
        })}
      >
        <Tab.Screen
          name={SCREEN_NAME.home_feed}
          component={HomeScreen}
          options={{
            title: i18n.t("home_zone_bottom_nav_bar_feed"),
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <FontAwesome6 name="file-video" size={hp(2.3)} color={color} />
              );
            },
            ...tabElementStyle,
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.home_history}
          component={HistoryScreen}
          options={{
            title: i18n.t("home_zone_bottom_nav_bar_history"),
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Ionicons
                  name="download-outline"
                  size={hp(2.6)}
                  color={color}
                />
              );
            },
            ...tabElementStyle,
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.home_guide}
          component={GuideScreen}
          options={{
            title: i18n.t("home_zone_bottom_nav_bar_guide"),
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <MaterialCommunityIcons
                  name="progress-question"
                  size={hp(2.6)}
                  color={color}
                />
              );
            },
            ...tabElementStyle,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
