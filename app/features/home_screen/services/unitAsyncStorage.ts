import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorage from "@/global/constants/async_storage";

export async function addToHistory(
  thumbnail: string,
  duration: string,
  description: string,
  time: string,
) {
  const data = await AsyncStorage.getItem("downloaded");
  let list: SavedVideoType[] = [];
  if (data !== null) {
    list = JSON.parse(data);
  }
  list.push({
    thumbnail,
    duration,
    description,
    time,
  });
  await AsyncStorage.setItem(asyncStorage.downloadedList, JSON.stringify(list));
}
