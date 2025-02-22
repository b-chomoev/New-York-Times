import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewsMutation } from '../../types';
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