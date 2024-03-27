import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            
            }),
        keepUnusedDataFor: 5,

        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: PRODUCTS_URL,
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
        
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.id}`,
                method: 'PUT',
                body: data,
            })
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { 
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateProductMutation, useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;

// import { PRODUCTS_URL } from "../constants";
// import { apiSlice } from "./apiSlice";
// import { useGetProductsQuery } from './apiSlice'; // Destructure directly

// export const productsApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getProducts: builder.query({
//             query: () => ({
//                 url: PRODUCTS_URL,
//             }),
//             keepUnusedDataFor: 5,
//         }),
//     }),
// });