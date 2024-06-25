import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  Product: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  Product: [],
  loading: false,
  error: null,
};
const loginSlice = createSlice({
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
});
const ProductAction = loginSlice.actions;
const checkLocalStorageProduct = () => {
  return (dispatch: any) => {
    const storedProduct = localStorage.getItem('Product');
    console.log('storedProduct', storedProduct);

    if (storedProduct) {
      dispatch(ProductAction.setProduct(JSON.parse(storedProduct)));
    }
  };
};

export { ProductAction, loginSlice, checkLocalStorageProduct };
