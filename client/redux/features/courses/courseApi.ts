import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ( data ) => ({
        url: "create-course",
        method: "POST",
        body: data ,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: ( ) => ({
        url: "get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id: string) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getUserAllCourses: builder.query({
      query: ( ) => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),


  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useGetUserAllCoursesQuery } = courseApi;
