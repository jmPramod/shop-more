import axios from 'axios';

// const baseUrl = process.env.NEXT_PUBLIC_Base_url;
const baseUrl = 'https://shopmore-theta.vercel.app';
export const getProductsCategory = async () => {
  try {
    console.log('baseUrl', baseUrl);
    const response = await axios.get(`${baseUrl}/products/get-categories`);
    return {
      message: response.data.message,
      data: response.data.data,
      // statusCode: response.data.statusCode,
    };
  } catch (error: any) {
    if (error) {
      return {
        // statusCode: error.response.data?.status,
        message: error,
        data: null,
      };
    }
  }
};

export const sortProducts = async (
  sortName: string,
  minMax: number,
  limit: number
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/products/sort?sortBy=${sortName}&minNmax=${minMax}&limit=${limit}`
    );
    return {
      message: response.data.message,
      data: response.data.data,
      // statusCode: response.data.statusCode,
    };
  } catch (error: any) {
    if (error) {
      return {
        // statusCode: error.response.data?.status,
        message: error,
        data: {},
      };
    }
  }
};
export const login = async (payload: any) => {
  try {
    const response = await axios.post(`${baseUrl}/api/login`, payload);
    return {
      message: response.data.message,
      data: response.data.data,
      // statusCode: response.data.statusCode,
    };
  } catch (error: any) {
    if (error) {
      return {
        // statusCode: error.response.data?.status,
        message: error,
        data: {},
      };
    }
  }
};

export const filterProducts = async (
  minPrice?: string,
  maxPrice?: number | string,
  category?: string,
  minRating?: number | string,
  discountPercentage?: number | string,
  brand?: string
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&minRating=${minRating}&discountPercentage=${discountPercentage}&brand=${brand}`
    );
    return {
      message: response.data.message,
      data: response.data.data,
      statusCode: response.data.statusCode,
    };
  } catch (error: any) {
    if (error) {
      return {
        message: error,
        data: {},
      };
    }
  }
};
export const getSingleProducts = async (id?: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/products/get-single-product/${id}`
    );
    return {
      message: response.data.message,
      data: response.data.data,
      statusCode: response.data.statusCode,
    };
  } catch (error: any) {
    if (error) {
      return {
        message: error,
        data: {},
      };
    }
  }
};
