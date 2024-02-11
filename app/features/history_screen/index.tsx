import { AntDesign } from "@expo/vector-icons";
import * as React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";

import AppBar from "@/global/components/ui/appbar";
import ScreenBase from "@/global/components/ui/screen_layout";
import { FontFamilyConstants } from "@/global/theme/font_family";
import { FontSizeConstants } from "@/global/theme/font_size";
import { colors } from "@/global/theme/pallete";
import { hp, wp } from "@/global/utils/responsive";
import i18n from "@/localization/i18n";
import { useAppSelector } from "@/global/hooks/redux";
import Typography from "@/global/components/utils/typography";
import Stack from "@/global/components/utils/stack";
import { BorderRadiusConstants } from "@/global/theme/border_radius";
import { Image } from "expo-image";
import Share from "react-native-share";
import MRECAds from "@/global/components/shared/applovin/MRECAds";

export default function HistoryScreen() {
  const mainData = useAppSelector((state) => state.main);
  const id = React.useId();

  const handOpenVideo = React.useCallback(
    async (uri?: string, title?: string) => {
      await Share.open({
        url: uri,
        title: title,
      });
    },
    [mainData.downloaded],
  );
  return (
    <ScreenBase
      AppBar={<AppBar title={i18n.t("history_screen_app_bar_title")} />}
    >
      {mainData.downloaded?.map((v, i) => (
        <TouchableOpacity
          onPress={handOpenVideo.bind(null, v.uri, v.description)}
        >
          <Stack
            style={styles.downloaded_card}
            key={id + i}
            direction="row"
            alignItems="center"
            gap={wp(2)}
          >
            <Image
              source={{
                uri: v.thumbnail,
              }}
              style={styles.downloaded_thumbnail}
            />
            <View style={styles.infoP}>
              <Stack direction="column">
                <Typography
                  style={{
                    fontFamily: FontFamilyConstants.ManRope.semiBold,
                    fontSize: FontSizeConstants.sm,
                  }}
                  type="content"
                >
                  {v.description}
                </Typography>
                <Typography
                  style={{
                    fontSize: FontSizeConstants.xs,
                  }}
                  type="content"
                >
                  {v.time}
                </Typography>
              </Stack>
            </View>
          </Stack>
        </TouchableOpacity>
      ))}
      <MRECAds />
      <View
        style={{
          paddingBottom: hp(4),
        }}
      ></View>
    </ScreenBase>
  );
}

const styles = StyleSheet.create({
  infoP: {
    padding: 5,
    overflow: "hidden",
  },
  downloaded_thumbnail: {
    width: wp(20),
    height: hp(10),
    borderRadius: BorderRadiusConstants.md,
  },
  downloaded_card: {
    paddingLeft: wp(1),
    marginBottom: hp(1),
    borderRadius: BorderRadiusConstants.lg,
    backgroundColor: "#eee",
  },
  infoName: {
    fontSize: FontSizeConstants.lg! - 2,
    fontFamily: FontFamilyConstants.ManRope.semiBold,
  },
  infoSub: {
    fontFamily: FontFamilyConstants.ManRope.regular,
    color: colors.textColor.secondaryColor,
    fontSize: FontSizeConstants.xs! + 1,
  },
  rightInfo: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderColor: colors.border.gray,
    borderWidth: 0.5,
    padding: wp(2),
    borderRadius: 10,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    gap: wp(3),
    alignItems: "center",
  },
  avatar: {
    height: hp(5),
  },
  infoStack: {
    flexGrow: 1,
  },
  donateBtn: {
    width: wp(30),
    height: hp(4),
    borderWidth: 0,
  },
  donateBtnText: {
    fontSize: FontSizeConstants.sm! - 0.5,
    color: colors.textColor.primaryColor,
  },
});
