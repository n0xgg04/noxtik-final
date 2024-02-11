import { RewardedAd } from "react-native-applovin-max";
import { Platform } from "react-native";
import { useState } from "react";
import { useCallback } from "react";
import { config } from "@/config";

const REWARDED_AD_UNIT_ID = Platform.select({
  android: config.applovin.rewarded_unit_ads_id,
  ios: "YOUR_IOS_REWARDED_AD_UNIT_ID",
});

type ApplovinInitialize = () => void;
type ApplovinLoadRewardedAd = () => void;
type ApplovinShowRewardedAd = () => Promise<void>;

interface IAppLovin {
  initializeRewardedAds: ApplovinInitialize;
  loadRewardedAd: ApplovinLoadRewardedAd;
  retryAttempt: number;
  showAds: ApplovinShowRewardedAd;
}

const MAX_EXPONENTIAL_RETRY_COUNT = 6;

export default function useRewardedAds(): IAppLovin {
  const [retryAttempt, setRetryAttempt] = useState<number>(0);

  const showAds = useCallback(async (): Promise<void> => {
    const isRewardedAdReady = await RewardedAd.isAdReady(REWARDED_AD_UNIT_ID!);
    if (isRewardedAdReady) {
      RewardedAd.showAd(REWARDED_AD_UNIT_ID!);
    }
  }, [REWARDED_AD_UNIT_ID, retryAttempt]);

  const loadRewardedAd = useCallback(() => {
    RewardedAd.loadAd(REWARDED_AD_UNIT_ID!);
  }, [REWARDED_AD_UNIT_ID, retryAttempt]);

  const initializeRewardedAds = useCallback(() => {
    RewardedAd.addAdLoadedEventListener((adInfo) => {
      setRetryAttempt(0);
    });

    RewardedAd.addAdLoadFailedEventListener((errorInfo) => {
      setRetryAttempt((pre) => pre + 1);

      if (retryAttempt > MAX_EXPONENTIAL_RETRY_COUNT) return;

      const retryDelay = Math.pow(
        2,
        Math.min(MAX_EXPONENTIAL_RETRY_COUNT, retryAttempt),
      );

      console.log(
        "Rewarded ad failed to load - retrying in " + retryDelay + "s",
      );

      setTimeout(() => {
        loadRewardedAd();
      }, retryDelay * 1000);
    });
    RewardedAd.addAdHiddenEventListener((adInfo) => {
      loadRewardedAd();
    });
    loadRewardedAd();
  }, [loadRewardedAd, retryAttempt]);

  return {
    initializeRewardedAds,
    loadRewardedAd,
    retryAttempt,
    showAds,
  };
}
