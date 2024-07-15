import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  return (dispatch: any) => {
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      console.log('storedUser', storedUser);
      dispatch(userAction.setUser(JSON.parse(storedUser)));
    }
  };
};

export { userAction, loginSlice, checkLocalStorageUser };
