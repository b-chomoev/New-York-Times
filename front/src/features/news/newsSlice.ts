import { News } from "../../types";
import { RootState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';
import { createNews, fetchNews } from './newsThunks';

interface ICocktail {
  news: News[];
  oneNews: News | null;
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ICocktail = {
  news: [],
  oneNews: null,
  fetchLoading: false,
  createLoading: false,
}

export const selectNews = (state: RootState) => state.news.news;
export const selectOneNews = (state: RootState) => state.news.oneNews;
export const selectNewsFetchLoading = (state: RootState) => state.news.fetchLoading;
export const selectNewsCreateLoading = (state: RootState) => state.news.createLoading;

export const createNewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNews.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.createLoading = false;
      })

      .addCase(fetchNews.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, { payload: news }) => {
        state.fetchLoading = false;
        state.news = news;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.fetchLoading = false;
      })
  }
})

export const createNewsReducer = createNewsSlice.reducer;