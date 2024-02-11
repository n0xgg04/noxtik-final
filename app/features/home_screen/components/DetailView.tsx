import * as React from "react";
import { StyleSheet } from "react-native";
import Stack from "@/global/components/utils/stack";
import { Image } from "expo-image";
import Typography from "@/global/components/utils/typography";
import { BorderRadiusConstants } from "@/global/theme/border_radius";
import { hp, wp } from "@/global/utils/responsive";
import { FontFamilyConstants } from "@/global/theme/font_family";
import { FontSizeConstants } from "@/global/theme/font_size";
import Button from "@/global/components/ui/button";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { MD3Colors, ProgressBar } from "react-native-paper";
import { useAppDispatch } from "@/global/hooks/redux";
import { addToDownloadList } from "@/redux/thunks";
import Share from "react-native-share";
import useRewardedAds from "@/global/services/applovin";
import { useToast } from "react-native-toast-notifications";
import i18n from "@/localization/i18n";

type Props = {
  data?: Data;
};
export default function DetailView({ data }: Props) {
  const toast = useToast();
  const { initializeRewardedAds, showAds } = useRewardedAds();
  React.useEffect(() => {
    initializeRewardedAds();
  }, []);
  const currentDate = new Date();
  const dispatch = useAppDispatch();
  const fileName = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}-${Math.floor(
    Math.random() * 10000,
  )}`;
  const [progress, setProgress] = React.useState(0);
  const videoFileUrl = FileSystem.documentDirectory + fileName + ".mp4";
  const downloader = FileSystem.createDownloadResumable(
    data?.url!,
    videoFileUrl,
    {
      headers: {
        "User-Agent": "NoxInfinity-NoxTik",
      },
    },
    (downloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      setProgress(progress);
    },
  );

  const onHandleDownload = React.useCallback(async () => {
    setProgress(0);
    showAds().then();
    const dt = await downloader.downloadAsync();
    if (dt?.status === 200) {
      const asset = await MediaLibrary.createAssetAsync(dt.uri);
      toast.show(i18n.t("download_success"));
      dispatch(
        addToDownloadList({
          video: {
            thumbnail: data?.thumbnail!,
            description: data?.description!,
            duration: data?.duration!,
            time: new Date().toUTCString(),
            uri: asset?.uri,
          },
        }),
      );

      await Share.open({
        url: asset.uri,
        title: data?.title || data?.description || "NoxTik",
      });
    }
  }, [downloader]);

  return (
    <Stack direction="column" gap={hp(1)}>
      <Image
        style={styles.thumbnail}
        source={{
          uri: data?.thumbnail,
        }}
      />
      <Stack direction="column" gap={2}>
        <Typography
          style={[
            styles.title,
            {
              fontSize: FontSizeConstants.lg! - 1,
              fontFamily: FontFamilyConstants.ManRope.semiBold,
            },
          ]}
          type="content"
        >
          {`Mô tả : `}
        </Typography>
        <Typography style={styles.title} type="content">
          {`${data?.title || ""} ${data?.description || ""}`}
        </Typography>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center">
        <Typography
          style={[
            styles.title,
            {
              fontSize: FontSizeConstants.lg! - 1,
              fontFamily: FontFamilyConstants.ManRope.semiBold,
            },
          ]}
          type="content"
        >
          {`Video dài: `}
        </Typography>
        <Typography style={styles.title} type="content">
          {`${data?.duration} giây`}
        </Typography>
      </Stack>
      <ProgressBar progress={progress} color={MD3Colors.secondary40} />

      <Button
        leftIcon={<AntDesign name="download" size={wp(5)} color="white" />}
        backgroundColor="#000"
        onPress={onHandleDownload}
      >
        Tải xuống
      </Button>
    </Stack>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: "100%",
    aspectRatio: "16/9",
    borderRadius: BorderRadiusConstants.lg,
    overflow: "hidden",
  },
  title: {
    fontSize: hp(1.7),
  },
});
