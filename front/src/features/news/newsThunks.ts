import { createAsyncThunk } from "@reduxjs/toolkit";
import { News, NewsMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const createNews = createAsyncThunk<void, NewsMutation>(
  "news/createNews",
  async (newsMutation) => {
    const formData = new FormData();

    const keys = Object.keys(newsMutation) as (keyof NewsMutation)[];

    keys.forEach((key) => {
      const value = newsMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post("/news", formData);
  },
);

export const fetchNews = createAsyncThunk<News[], void>(
  "news/fetchNews",
  async () => {
    const response = await axiosApi<News[]>("/news");
    return response.data || [];
  },
);

export const fetchUserNews = createAsyncThunk<News[], string>(
  "news/fetchUserNews",
  async (id) => {
    const response = await axiosApi<News[]>(`/news/user/${id}`);
    return response.data;
  }
);