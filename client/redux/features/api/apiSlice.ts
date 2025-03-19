// This file is of no longer use because I have written the below code in authApi.ts file itself
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_SERVER_URL,
    }),
    endpoints:() =>({})
})

export const {}=apiSlice;

