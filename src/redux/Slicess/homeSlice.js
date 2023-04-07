import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchHomeInformation = createAsyncThunk(
  'home/fetchHomeInformation',
  async (watchedProductsIds) => {
    const language = localStorage.getItem('i18nextLng');
    const { data } = await axios.get(
      `/api/page?lan=${language}`/*,
      watchedProductsIds*/
    );

    return data;
  }
);

export const fetchProductPageInformation = createAsyncThunk(
  'home/fetchProductPageInformation',
  async ({ product_url }) => {
    const language = localStorage.getItem('i18nextLng');
    const { data } = await axios.get(
      `api/page/product/${product_url}?lan=${language}`
    );

    return data;
  }
);

export const fetchWatchedProducts = createAsyncThunk(
  'home/fetchWatchedProducts',
  async ({ ids }) => {
    const language = localStorage.getItem('i18nextLng');
    const { data } = await axios.post(`api/products?lan=${language}`, {
      productIds: ids,
    });

    return data;
  }
);

const initialState = {
  //----------- Home page
  productInfo: {},
  categories: [],
  actualCategory: [],
  actualSubcategories: [],
  discountProducts: [],
  newProducts: [],
  news: [],
  status: null,
  // wathed products
  watchedProducts: [],
  watchedProductsIds: [],
  watchedProductsStatus: null,
  //---------- AllProducts page
  product_information: {},
  photos: [],
  related_products: [],
  characteristics: [],
  description: "",
  productStatus: null,
  meta: {},
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearProductInfo: (state, action) => {
      state.product_information = [];
      state.photos = [];
      state.properties = [];
      state.characteristics = [];
      state.description = "";
      state.productStatus = null;
    },

    searchActualCategory: (state, action) => {
      state.actualSubcategories = state.categories[
        action.payload.language
      ].filter((el) => el.parent_id === action.payload.id);

      state.actualCategory = state.categories[action.payload.language].filter(
        (el) => el.id === action.payload.id
      )[0];
    },

    clearActualSubcategories: (state, action) => {
      state.actualSubcategories = [];
      state.actualCategory = [];
    },

    addProductToWatched: (state, action) => {
      if (
        !state.watchedProductsIds.filter(
          (el) => Number(el) === Number(action.payload)
        ).length
      ) {
        state.watchedProductsIds = [
          ...state.watchedProductsIds,
          action.payload,
        ];
      }
    },
  },
  extraReducers: {
    // ---------- get and seporate home information
    [fetchHomeInformation.pending]: (state, action) => {
      state.error = null;
      state.status = 'loading';
    },
    [fetchHomeInformation.fulfilled]: (state, action) => {
      const language = localStorage.getItem('i18nextLng');
      localStorage.setItem('categories', JSON.stringify(action.payload.categories))
      state.categories = {
        ...state.categories,
        [language]: action.payload.categories,
      };

      state.discountProducts = {
        ...state.discountProducts,
        [language]: action.payload.discountProducts,
      };

      state.newProducts = {
        ...state.newProducts,
        [language]: action.payload.newProducts,
      };
      state.news = { ...state.categories, [language]: action.payload.news };
      state.watchedProducts = {
        ...state.watchedProducts,
        [language]: action.payload.watchedProducts,
      };
      state.status = 'success';
    },
    [fetchHomeInformation.rejected]: (state, action) => {
      state.status = 'error';
    },
    // get and separate product page information
    [fetchProductPageInformation.pending]: (state, action) => {
      state.error = null;
      state.productStatus = 'loading';
    },
    [fetchProductPageInformation.fulfilled]: (state, action) => {
      state.product_information = action.payload.productInfo.product_information;
      state.photos = action.payload.productInfo.photos;
      state.related_products = action.payload.productInfo.related_products;
      state.characteristics = action.payload.productInfo.characteristics;
      state.description = action.payload.productInfo.description;
      state.meta = action.payload.productInfo.meta;
      state.productStatus = 'success';


    },
    [fetchProductPageInformation.rejected]: (state, action) => {
      state.productStatus = 'error';
    },
    // get watched products
    [fetchWatchedProducts.pending]: (state, action) => {
      state.error = null;
      state.watchedProductsStatus = 'loading';
    },
    [fetchWatchedProducts.fulfilled]: (state, action) => {
      state.watchedProducts = action.payload.products;
      state.watchedProductsStatus = 'success';
    },
    [fetchWatchedProducts.rejected]: (state, action) => {
      state.watchedProductsStatus = 'error';
    },
  },
});

//

export const {
  clearProductInfo,
  searchActualCategory,
  clearActualSubcategories,
  addProductToWatched,
} = homeSlice.actions;
export default homeSlice.reducer;
