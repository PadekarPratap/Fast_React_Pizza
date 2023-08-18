import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAddress } from '../../services/apiGeoPosition';

const initialState = {
  username: '',
  status: 'idle',
  error: '',
  address: '',
  position: {},
};

export const fetchUserAddress = createAsyncThunk(
  'user/fetchAddress',
  async (action) => {
    const address = await fetchAddress(action.lat, action.lng);

    // payload
    return { address, position: action.position };
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchUserAddress.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.address = action.payload.address;
        state.position = { ...action.payload.position };
        state.status = 'idle';
      })
      .addCase(fetchUserAddress.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      }),
});

export const { createUser } = userSlice.actions;

export default userSlice.reducer;
