import { GradientColor } from "@/global/base/classes/gradient-color";

export const colors: PalletteT = {
  textColor: {
    primaryColor: "#303651",
    secondaryColor: "#1C2035",
    white: "#ffffff",
    gray: "#989EB3",
    blue: "#17191c",
  },
  backgroundColor: {
    primaryColor: "#ffffff",
    secondaryColor: "#FBFCFF",
    white: "#ffffff",
    gray: "#eee",
    donateBtn: "rgba(192,197,192,0.38)",
    overlay: "rgba(0,0,0,0.35)",
  },
  gradientColor: {
    btn: new GradientColor(["#3264F5", "#3297F5"]),
  },
  border: {
    blue: "#04143f",
    no_active: "#eeeeee",
    gray: "rgba(73,120,240,0.2)",
  },
  colors: {
    active: "#2c2f34",
    focus_label: "#1a1c1f",
    no_active: "gray",
    bnv_active: "#6142F5",
    bnv_inactive: "#484B63",
  },
};
