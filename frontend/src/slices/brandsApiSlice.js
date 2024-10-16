import { BRANDS_URL } from '../utils/constants';
import { apiSlice } from './apiSlice';

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (brand) => ({
        url: BRANDS_URL,
        method: 'POST',
        body: { ...brand },
      }),
    }),
    getBrands: builder.query({
      query: () => ({
        url: BRANDS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getBrandDetails: builder.query({
      query: (brandId) => ({
        url: `${BRANDS_URL}/${brandId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateBrand: builder.mutation({
      query: (data) => ({
        url: `${BRANDS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteBrand: builder.mutation({
      query: (brandId) => ({
        url: `${BRANDS_URL}/${brandId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetBrandsQuery,
  useGetBrandDetailsQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApiSlice;
