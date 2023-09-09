import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { MoviesData } from "../FakeData";


export const movieSlice = createSlice({
  name: "movie",
  initialState: { entries: MoviesData },
  reducers: {
    addMovie: (state, action) => {
      state.entries.push(action.payload);
    },

    deleteMovie: (state, action) => {
      state.entries = state.entries.filter((movie) => movie.id !== action.payload.id);
    },

    updateMovie: (state, action) => {
      state.entries.map((movie) => {
        if (movie.id?.toString() === action.payload.id?.toString()) {
          movie.originalTitle = action.payload.originalTitle;
          movie.localTitle = action.payload.localTitle;
        }
      });
    },
  },
});

export const { addMovie, deleteMovie, updateMovie } = movieSlice.actions;
export default movieSlice.reducer;