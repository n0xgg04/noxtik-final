import { createReducer } from "@reduxjs/toolkit";

import {
  addToDownloadedList,
  changeLanguage,
  initApplication,
} from "@/redux/actions";
import { addToDownloadList, loadDownloadedList } from "@/redux/thunks";

const initialReducer: AppReducer = {
  appLanguage: "vi",
  downloaded: [],
  downloadedList: false,
};

export const reducers = createReducer(initialReducer, (builder) => {
  builder
    .addCase(changeLanguage, (state, action) => {
      state.appLanguage = action.payload;
    })
    .addCase(initApplication, (state, action) => {
      state.appLanguage = action.payload.appLanguage;
    })
    .addCase(loadDownloadedList.fulfilled, (state, action) => {
      state.downloaded = JSON.parse(action.payload!);
      state.downloadedList = true;
    })
    .addCase(addToDownloadList.fulfilled, (state, action) => {
      state.downloaded = action.payload;
    });
});
