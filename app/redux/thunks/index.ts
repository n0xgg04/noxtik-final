import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorage from "@/global/constants/async_storage";

export const loadDownloadedList = createAsyncThunk(
  "loaddownloaded",
  (arg, thunkAPI): Promise<string | null> => {
    return AsyncStorage.getItem(asyncStorage.downloadedList);
  },
);

export const addToDownloadList = createAsyncThunk<
  SavedVideoType[],
  {
    video: SavedVideoType;
  }
>("adddownloaded", async (arg, thunkAPI): Promise<SavedVideoType[]> => {
  const downloaded: SavedVideoType[] = JSON.parse(
    (await AsyncStorage.getItem(asyncStorage.downloadedList)) || "[]",
  );
  downloaded.push(arg.video);
  await AsyncStorage.setItem(
    asyncStorage.downloadedList,
    JSON.stringify(downloaded),
  );
  return downloaded;
});
