import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { IPhoto } from "../../helpers";
import { UNSPLASH_CLIENT_ID as clientId } from "@env";

const UNSPLASH_ROOT = "https://api.unsplash.com";

export interface PhotosState {
  isLoading: boolean;
  data: IPhoto[];
  error: string | undefined;
}

const initialState: PhotosState = {
  isLoading: false,
  data: [],
  error: "",
};

export const getPhotosByQuery = createAsyncThunk(
  "photos/getPhotosByQuery",
  async function (_, { rejectWithValue }) {
    try {
      console.log("key", clientId);
      return await fetch(
        `${UNSPLASH_ROOT}/photos/random?client_id=${clientId}&count=20`
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Server Error!");
        }
        return res.json();
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotosByQuery.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPhotosByQuery.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getPhotosByQuery.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export const { setLoadingState } = photosSlice.actions;

export default photosSlice.reducer;
