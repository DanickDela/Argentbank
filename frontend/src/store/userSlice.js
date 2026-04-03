import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../service/api";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, thunkAPI) => {
    try {
      return await getUserProfile(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Erreur serveur",
      );
    }
  },
  {
    condition: (token, { getState }) => {
      const { user } = getState();

      //  bloque si un appel déjà en cours
      if (user.status === "loading") {
        return false;
      }

      // bloque si déjà chargé
      if (user.status === "succeeded") {
        return false;
      }

      return true;
    },
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    status: "idle",
    error: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clearUserProfile: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.firstName = "";
        state.lastName = "";
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearUserProfile, setUserProfile } = userSlice.actions;
export default userSlice.reducer;
