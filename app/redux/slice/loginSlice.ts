import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profileUpdate } from './../../../services/Api.Servicer';

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
});
const userAction = loginSlice.actions;
const checkLocalStorageUser = () => {
  return async (dispatch: any) => {
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      const fetchUser = JSON.parse(storedUser);
      try {
        console.log('fetchUser', fetchUser);
        let result = await profileUpdate({}, fetchUser._id);
        dispatch(userAction.setUser(result?.data));      }
         catch (error:any) {
        dispatch(userAction.setError(error.message));
      }
    }
  };
};

export { userAction, loginSlice, checkLocalStorageUser };
