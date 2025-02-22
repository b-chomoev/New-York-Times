import { News } from "../../types";
import { RootState } from '../../app/store';
import { createSlice } from '@reduxjs/toolkit';
import { createNews } from './newsThunks';

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

export const selectCocktails = (state: RootState) => state.news.news;
export const selectOneCocktail = (state: RootState) => state.news.oneNews;
export const selectCocktailFetchLoading = (state: RootState) => state.news.fetchLoading;
export const selectCocktailCreateLoading = (state: RootState) => state.news.createLoading;

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
  }
})

export const createNewsReducer = createNewsSlice.reducer;