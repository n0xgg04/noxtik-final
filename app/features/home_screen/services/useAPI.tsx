import { useQuery } from "react-query";
import getVideoDetail from "@/features/home_screen/services/getVideoDetail";
import { ToastAndroid } from "react-native";
import i18n from "@/localization/i18n";

export default function useNoxTik(url: string) {
  return useQuery({
    queryKey: ["noxtik", url],
    enabled: false,
    queryFn: () => getVideoDetail(url),
    onError: (err) => {
      ToastAndroid.show(i18n.t("not_exists"), ToastAndroid.SHORT);
    },
  });
}
