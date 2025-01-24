import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  likedArticles: string[]; // URLs статей
  readLaterArticles: string[];
  readArticles: string[];
}

const initialState: UserState = {
  likedArticles: [],
  readLaterArticles: [],
  readArticles: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const url = action.payload;
      const index = state.likedArticles.indexOf(url);
      if (index === -1) {
        state.likedArticles.push(url);
      } else {
        state.likedArticles.splice(index, 1);
      }
    },
    toggleReadLater: (state, action: PayloadAction<string>) => {
      const url = action.payload;
      const index = state.readLaterArticles.indexOf(url);
      if (index === -1) {
        state.readLaterArticles.push(url);
      } else {
        state.readLaterArticles.splice(index, 1);
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      if (!state.readArticles.includes(action.payload)) {
        state.readArticles.push(action.payload);
      }
    },
  },
});

export const { toggleLike, toggleReadLater, markAsRead } = userSlice.actions; 