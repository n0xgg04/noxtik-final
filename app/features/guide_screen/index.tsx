import { AntDesign } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet } from "react-native";

import AppBar from "@/global/components/ui/appbar";
import Button from "@/global/components/ui/button";
import ScreenBase from "@/global/components/ui/screen_layout";
import { FontFamilyConstants } from "@/global/theme/font_family";
import { FontSizeConstants } from "@/global/theme/font_size";
import { colors } from "@/global/theme/pallete";
import { hp, wp } from "@/global/utils/responsive";
import i18n from "@/localization/i18n";
import Stack from "@/global/components/utils/stack";
import { Image } from "expo-image";
import { ImagesConstants } from "@/global/constants/resources/images";
import Typography from "@/global/components/utils/typography";
import useRewardedAds from "@/global/services/applovin";
import { useToast } from "react-native-toast-notifications";

export default function GuideScreen() {
  const toast = useToast();
  const { initializeRewardedAds, showAds } = useRewardedAds();
  React.useEffect(() => {
    initializeRewardedAds();
  }, []);

  const handleDonate = React.useCallback(() => {
    showAds().then();
    toast.show(i18n.t("thanks"));
  }, []);

  return (
    <ScreenBase
      AppBar={<AppBar title={i18n.t("guide_screen_app_bar_title")} />}
    >
      <Stack direction="column" gap={hp(2)}>
        <Typography type="h3">Step 1:</Typography>
        <Image source={ImagesConstants.icons.step1} style={styles.img} />
        <Typography type="h3">Step 2:</Typography>
        <Image source={ImagesConstants.icons.step2} style={styles.img} />
      </Stack>
    </ScreenBase>
  );
}

const styles = StyleSheet.create({
  img: {
    width: wp(90),
    aspectRatio: "16/9",
    objectFit: "contain",
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
    backgroundColor: "transparent",
  },
  donateBtnText: {
    fontSize: FontSizeConstants.sm! - 0.5,
    color: colors.textColor.primaryColor,
    backgroundColor: "transparent",
  },
});
