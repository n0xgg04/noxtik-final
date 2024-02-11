import { Platform, StyleSheet } from "react-native";
import React from "react";
import {
  AdViewPosition,
  AdView,
  AdFormat,
  MRecAd,
} from "react-native-applovin-max";
import { config } from "@/config";
const styles = StyleSheet.create({
  banner: {
    backgroundColor: "white",
    width: "100%",
    minHeight: 200,
    bottom: Platform.select({
      ios: 36,
      android: -20,
    }),
  },
});

const MREC_AD_UNIT_ID = Platform.select({
  android: config.applovin.mrec_unit_ads_id,
  ios: config.applovin.mrec_unit_ads_id,
});
export function initializeMrecAds() {
  MRecAd.createAd(MREC_AD_UNIT_ID!, AdViewPosition.BOTTOM_CENTER);
  MRecAd.showAd(MREC_AD_UNIT_ID!);
}
export default function MRECAds() {
  return (
    <AdView
      style={styles.banner}
      adUnitId={MREC_AD_UNIT_ID!}
      adFormat={AdFormat.MREC}
      onAdLoaded={(adInfo) => {}}
      onAdLoadFailed={(errorInfo) => {}}
      onAdClicked={(adInfo) => {}}
      onAdExpanded={(adInfo) => {}}
      onAdCollapsed={(adInfo) => {}}
      onAdRevenuePaid={(adInfo) => {}}
    />
  );
}
