import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            
            }),
        keepUnusedDataFor: 5,
        providesTags: ['Product'],

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
        uploadProductImage: builder.mutation({
            query: (productId) => ({
                url: `${UPLOAD_URL}/productId`,
                method: 'POST',
            }),
        })
    }),
});

export const { 
    useUploadProductImageMutation,
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