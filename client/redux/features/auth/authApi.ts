import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice"; // adjust the import as needed
import { apiSlice } from "../api/apiSlice";

// 1. Define the base API slice
// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
//   }),
//   endpoints: () => ({}),
// });

// 2. Define types for your auth endpoints
type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  // Define your registration data properties here (e.g., email, password)
};

// type ActivationRequest = {
//   activation_token: string;
//   activation_code: string;
// };

// type ActivationResponse = {
//   message: string; // Adjust based on your actual API response
// };

// 3. Inject your auth endpoints into the API slice

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints for registration and activation

    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("Registration data",result.data);

          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.error("Error during registration:", error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("Registration data",result.data);

          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.error("Error during registration:", error);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "socialauth",
        method: "POST",
        body: { email, name, avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("Registration data",result.data);

          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log("Error during registration:", error);
        }
      },
    }),

    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, {dispatch }) {
        try {
          // console.log("Registration data",result.data);

          dispatch(
            userLoggedOut()
          );
        } catch (error) {
          console.log("Error during logout:", error);
        }
      },
    }),
  }),
});

// 4. Export auto-generated hooks for your endpoints
export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogOutQuery
} = authApi;
