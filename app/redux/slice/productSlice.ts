import { GetCartList } from '../../../services/Api.Servicer';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface ProductState {
  Product: any[];
  loading: boolean;
  error: string | null;
}
const fetchCartProduct = createAsyncThunk<any, string>(
  'fetch/cart',
  async (body, thunkApi) => {
    try {
      let response2 = await GetCartList(body);

      return response2?.data?.cartAdded;
    } catch (err:any) {
      return thunkApi.rejectWithValue(err.message || 'Failed to fetch cart products');
    }
  }
);

const initialState: ProductState = {
  Product: [],
  loading: false,
  error: null,
};
const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<any>) {
      state.Product = action.payload;
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
      state.Product = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.Product = action.payload;
    });
  },
});
const ProductAction = productSlice.actions;

export { ProductAction, productSlice, fetchCartProduct };
