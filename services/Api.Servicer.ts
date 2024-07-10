import axios from 'axios';

// const baseUrl = process.env.NEXT_PUBLIC_Base_url;
const baseUrl = 'https://shop-more.vercel.app';
export const getProductsCategory = async () => {
  try {
       const response = await axios.get(`${baseUrl}/products/get-categories`);
    return {
      message: response.data.message,
      data: response.data.data,
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

export const sortProducts = async (sortName: string, minMax: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/products/sort?sortBy=${sortName}&minNmax=${minMax}`
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

export const registerUser = async (payload: any) => {
  try {
    const response = await axios.post(`${baseUrl}/api/register`, payload);
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
export const resetPassword = async (payload: any) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/forget-password`,
      payload
    );
       return {
      message: response.data.message,
      data: response.data.data,
      statusCode: response.data.statusCode,
    };
  } catch (error: any) {
    if (error) {
      return {
        statusCode: error.response.data?.status,
        message: error,
        data: null,
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

export const SearchProducts = async (searchTerm?: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/products/search?term=${searchTerm}`
    );
    return {
      message: response.data.message,
      data: response.data.data,
      statusCode: response.data.statusCode,
    };
  } catch (error: any) {
    if (error) {
      return {
        message: error?.response?.data.message,
        data: error?.response?.data.data,
        statusCode: error?.response?.data.statusCode,
      };
    }
  }
};
