import { PermissionsAndroid } from "react-native";

export const requestPermission = async () => {
  const result = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS["WRITE_EXTERNAL_STORAGE"],
    PermissionsAndroid.PERMISSIONS["READ_EXTERNAL_STORAGE"],
    PermissionsAndroid.PERMISSIONS["ACCESS_MEDIA_LOCATION"],
  ]);
  return result;
};
