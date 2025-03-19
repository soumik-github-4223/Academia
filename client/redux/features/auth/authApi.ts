import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userRegistration } from './authSlice'; // adjust the import as needed

// 1. Define the base API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  endpoints: () => ({}),
});

// 2. Define types for your auth endpoints
type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  // Define your registration data properties here (e.g., email, password)
};

type ActivationRequest = {
  activation_token: string;
  activation_code: string;
};

type ActivationResponse = {
  message: string; // Adjust based on your actual API response
};

// 3. Inject your auth endpoints into the API slice
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: 'registration',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation<ActivationResponse, ActivationRequest>({
      query: ({ activation_token, activation_code }) => ({
        url: 'activate-user',
        method: 'POST',
        body: { activation_token, activation_code },
      }),
    }),
  }),
});

// 4. Export auto-generated hooks for your endpoints
export const { useRegisterMutation, useActivationMutation } = authApi;
