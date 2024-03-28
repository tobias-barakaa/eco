import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login/`,
                method: 'POST',
                body: data
            
            }),

        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register/`,
                method: 'POST',
                body: data
            
            })

        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout/`,
                method: 'POST',
            })
        }),
        profile: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/profile/`,
            method: 'PUT',
            body: data
         })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUsers: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            })
        }),
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: ({ data }) => ({
                url: `${USERS_URL}/${data.id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        })
       
    }),
});

export const { useGetUserDetailsQuery, useUpdateUserMutation,useDeleteUsersMutation,useGetUsersQuery,useLoginMutation, useLogoutMutation, useRegisterMutation,useProfileMutation  } = usersApiSlice;
