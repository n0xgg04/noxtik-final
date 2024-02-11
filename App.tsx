import * as Font from "expo-font";
import React from "react";
import AppLovinMAX, { Configuration } from "react-native-applovin-max";

import Application from "@/main";
import { config } from "@/config";
import { initializeBannerAds } from "@/global/components/shared/applovin/BannerAds";
import { initializeMrecAds } from "@/global/components/shared/applovin/MRECAds";
export default function App() {
  const [loadingFonts, setIsLoadingFont] = React.useState(true);
  const [loadingSDK, setLoadingSDK] = React.useState(true);
  React.useEffect(() => {
    Font.loadAsync({
      "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
      "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
      "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    }).then(() => setIsLoadingFont(false));
  }, []);
  React.useEffect(() => {
    AppLovinMAX.initialize(config.applovin.key)
      .then((conf: Configuration) => {
        setLoadingSDK(false);
      })
      .catch((error) => {
        setLoadingSDK(false);
      });
  }, []);
  if (loadingFonts || loadingSDK) return;
  return <Application />;
}
