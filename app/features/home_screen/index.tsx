import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import {
  Animated,
  Dimensions,
  Easing,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from "react-native";
import AppBar from "@/global/components/ui/appbar";
import Button from "@/global/components/ui/button";
import ScreenBase from "@/global/components/ui/screen_layout";
import { FontFamilyConstants } from "@/global/theme/font_family";
import { FontSizeConstants } from "@/global/theme/font_size";
import { colors } from "@/global/theme/pallete";
import { hp, wp } from "@/global/utils/responsive";
import i18n from "@/localization/i18n";
import Card from "@/global/components/ui/card";
import { ImageBackground } from "expo-image";
import { ImagesConstants } from "@/global/constants/resources/images";
import InputGroup from "@/global/components/ui/input_group";
import Stack from "@/global/components/utils/stack";
import * as Clipboard from "expo-clipboard";
import useNoxTik from "@/features/home_screen/services/useAPI";
import DetailView from "@/features/home_screen/components/DetailView";
import { useToast } from "react-native-toast-notifications";
import {
  convertToYouTubeURL,
  extractURLsFromString,
  getFullURL,
} from "@/global/utils/parse";
import { requestPermission } from "@/features/home_screen/services/checkPermission";
import ReceiveSharingIntent from "react-native-receive-sharing-intent";
import MRECAds from "@/global/components/shared/applovin/MRECAds";
import BannerAds from "@/global/components/shared/applovin/BannerAds";

export default function HomeScreen() {
  const toast = useToast();
  const [url, setUrl] = React.useState<string>("");
  const { refetch, data, isLoading, isError, isFetched, remove } =
    useNoxTik(url);

  ReceiveSharingIntent.getReceivedFiles(
    (files: IntentRoot[]) => {
      const t = files[0].weblink;
      if (t.length <= 0) return;
      if (t?.includes("youtu")) {
        setUrl(convertToYouTubeURL(t));
        return;
      }
      const text = extractURLsFromString(t);
      text && setUrl(text[0] + (text[0].endsWith("/") ? "" : "/"));
    },
    (error: Error) => {
      //  console.log(error);
    },
    "ShareMedia",
  );

  React.useEffect(() => {
    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
    };
  }, []);

  const handleOnPaste = async () => {
    let t = await Clipboard.getStringAsync();
    if (t?.includes("youtu")) {
      setUrl(convertToYouTubeURL(t));
      return;
    }

    const text = extractURLsFromString(t);
    text && setUrl(text[0] + (text[0].endsWith("/") ? "" : "/"));
  };

  const handleOnChange = React.useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setUrl(e.nativeEvent.text);
    },
    [],
  );

  const handleOnBack = React.useCallback(() => {
    remove();
    handleBackDetailCard();
  }, []);

  const goToLeftAnimation = React.useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;

  const goToLeftAnimationChild = React.useRef<Animated.Value>(
    new Animated.Value(-Dimensions.get("window").width),
  ).current;

  const getVideo = React.useCallback(async () => {
    if (url.includes("vt.tiktok")) {
      const full = await getFullURL(url);
      setUrl(full);
    }
    await refetch();
  }, [isLoading, url]);

  const handleOnNext = React.useCallback(async () => {
    if (isLoading) return;
    await getVideo();
  }, []);

  const handleGoToDetailCard = React.useCallback(() => {
    Animated.parallel([
      Animated.timing(goToLeftAnimation, {
        toValue: Dimensions.get("window").width,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(goToLeftAnimationChild, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackDetailCard = React.useCallback(() => {
    Animated.parallel([
      Animated.timing(goToLeftAnimation, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(goToLeftAnimationChild, {
        toValue: -Dimensions.get("window").width,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  React.useEffect(() => {
    if (isFetched) {
      if (!data?.data) {
        toast.show("Video không tồn tại...");
        return;
      }
      handleGoToDetailCard();
    }
  }, [isFetched]);

  React.useEffect(() => {
    requestPermission().then((d) => {
      console.log(d);
    });
  }, []);

  return (
    <ScreenBase AppBar={<AppBar title={i18n.t("feed_screen_app_bar_title")} />}>
      <Card
        image={
          <Animated.View
            style={{
              transform: [
                {
                  translateX: goToLeftAnimation,
                },
              ],
            }}
          >
            <ImageBackground
              source={ImagesConstants.icons.bg}
              style={styles.img}
            />
          </Animated.View>
        }
        style={[styles.card]}
        relativeElement={
          <Animated.View
            style={[
              styles.cat,
              {
                transform: [
                  {
                    translateX: goToLeftAnimationChild,
                  },
                ],
              },
            ]}
          >
            <Stack direction="column" gap={hp(2)}>
              <Button
                onPress={handleOnBack}
                leftIcon={
                  <MaterialIcons name="arrow-left" size={wp(8)} color="white" />
                }
                textStyle={{
                  color: "white",
                }}
                backgroundColor="black"
                style={styles.back}
              >
                Quay lại
              </Button>
              <DetailView data={data?.data} />
            </Stack>
          </Animated.View>
        }
      >
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: goToLeftAnimation,
                },
              ],
            },
          ]}
        >
          <Stack direction="column" gap={hp(2)}>
            <Stack direction="row" alignItems="center">
              <View style={styles.inputurl}>
                <InputGroup
                  onChange={handleOnChange}
                  value={url}
                  leftIcon={(color) => (
                    <AntDesign name="link" size={wp(4.5)} color={color} />
                  )}
                  label={i18n.t("home_url_label")}
                />
              </View>
            </Stack>
            <Stack direction="column" gap={hp(0.75)}>
              <Button
                onPress={handleOnPaste}
                leftIcon={
                  <MaterialIcons
                    name="content-paste-go"
                    size={wp(5)}
                    color="black"
                  />
                }
                backgroundColor={colors.backgroundColor.secondaryColor}
                textStyle={styles.anotherBtnText}
                style={styles.anotherBtn}
              >
                {i18n.t("paste")}
              </Button>
              <Button
                leftIcon={
                  <AntDesign name="download" size={wp(5)} color="white" />
                }
                backgroundColor="#000"
                onPress={handleOnNext}
              >
                {isLoading ? "Loading..." : i18n.t("home_download_btn")}
              </Button>
            </Stack>
          </Stack>
        </Animated.View>
      </Card>
    </ScreenBase>
  );
}

const styles = StyleSheet.create({
  back: {
    borderWidth: 0,
    maxWidth: wp(30),
  },
  cat: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 99,
    padding: wp(3),
    top: 0,
    left: 0,
    right: 0,
  },
  card: {
    width: "100%",
    minHeight: hp(90),
    position: "relative",
  },
  center: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  inputurl: {
    flexGrow: 1,
  },
  img: {
    width: "100%",
    aspectRatio: "16/9",
    resizeMode: "contain",
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
  },
  donateBtnText: {
    fontSize: FontSizeConstants.sm! - 0.5,
    color: colors.textColor.primaryColor,
  },
  icon: {
    width: wp(5),
    aspectRatio: "1/1",
  },
  toolbar: {
    marginHorizontal: wp(3),
  },
  backBtn: {
    height: hp(4.5),
    aspectRatio: "1/1",
    borderColor: colors.border.dark,
  },
  full: {
    width: "100%",
  },
  getStarted: {
    fontSize: FontSizeConstants.lg,
    fontFamily: FontFamilyConstants.ManRope.bold,
    color: colors.textColor.blue,
  },
  noAccount: {
    fontSize: FontSizeConstants.sm,
    fontFamily: FontFamilyConstants.ManRope.semiBold,
    color: colors.textColor.primaryColor,
  },
  anotherBtn: {
    borderColor: colors.border.gray,
  },
  anotherBtnText: {
    color: colors.textColor.secondaryColor,
    fontSize: FontSizeConstants.md,
  },
});
