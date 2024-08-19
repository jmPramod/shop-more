import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { profileUpdate } from './../../../services/Api.Servicer';
interface UserData {
  _id: string;
  name: string;
  secondName: string;
  email: string;
  phone: number;
  password: string;
  role: string;
  cloudinaryPublicId: string | null;
  address: string;
  pinCode: number;
  cartAdded: string[];
  createdAt: string;
  updatedAt: string;
  images: {
    imageUrl: string;
    imgPublicId: string;
  };
}

const fetchInitialUser = createAsyncThunk<UserData, string>(
  'fetch/initialUser',
  async (id: string, thunkApi) => {
    try {
      let response2 = await profileUpdate({}, id);
      return response2?.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err.message || 'Failed to fetch user data'
      );
    }
  }
);
interface LoginState {
  user: any;
  loading: boolean;
  error: string | null;
  token: string | null;
  cartList: number | null;
}

const initialState: LoginState = {
  user: {},
  loading: false,
  error: null,
  token: null,
  cartList: 0,
};
const loginSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.loading = false;
    },
    AddCartProduct(state, action: PayloadAction<any>) {
      state.cartList = action.payload;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.token = null;
      state.cartList = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialUser.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      state.loading = false;
      state.user = action.payload;
    });
  },
});
const userAction = loginSlice.actions;
export { userAction, loginSlice, fetchInitialUser };
