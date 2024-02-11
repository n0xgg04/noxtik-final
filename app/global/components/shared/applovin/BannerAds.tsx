import { Platform, StyleSheet } from "react-native";
import React from "react";
import {
  BannerAd,
  AdViewPosition,
  AdView,
  AdFormat,
} from "react-native-applovin-max";
import { config } from "@/config";
const styles = StyleSheet.create({
  banner: {
    backgroundColor: "white",
    width: "100%",
    height: 100,
    bottom: Platform.select({
      ios: 36,
      android: -20,
    }),
  },
});

const BANNER_AD_UNIT_ID = Platform.select({
  android: config.applovin.banner_unit_ads_id,
  ios: config.applovin.banner_unit_ads_id,
});
export function initializeBannerAds() {
  BannerAd.createAd(BANNER_AD_UNIT_ID!, AdViewPosition.BOTTOM_CENTER);
  BannerAd.setBackgroundColor(BANNER_AD_UNIT_ID!, "#fff");
  BannerAd.showAd(BANNER_AD_UNIT_ID!);
}
export default function BannerAds() {
  React.useEffect(() => {}, []);

  return (
    <AdView
      adUnitId={BANNER_AD_UNIT_ID!}
      adFormat={AdFormat.BANNER}
      style={styles.banner}
      onAdLoaded={(adInfo) => {
        console.log("Banner ad loaded from " + adInfo.networkName);
      }}
      onAdLoadFailed={(errorInfo) => {
        console.log(
          "Banner ad failed to load with error code " +
            errorInfo.code +
            " and message: " +
            errorInfo.message,
        );
      }}
      onAdClicked={(adInfo) => {
        console.log("Banner ad clicked");
      }}
      onAdExpanded={(adInfo) => {
        console.log("Banner ad expanded");
      }}
      onAdCollapsed={(adInfo) => {
        console.log("Banner ad collapsed");
      }}
      onAdRevenuePaid={(adInfo) => {
        console.log("Banner ad revenue paid: " + adInfo.revenue);
      }}
    />
  );
}
