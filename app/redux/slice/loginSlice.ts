import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: {},
  loading: false,
  error: null,
};
const loginSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
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
    },
  },
});
const userAction = loginSlice.actions;
const checkLocalStorageUser = () => {
  return (dispatch: any) => {
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      dispatch(userAction.setUser(JSON.parse(storedUser)));
    }
  };
};

export { userAction, loginSlice, checkLocalStorageUser };
