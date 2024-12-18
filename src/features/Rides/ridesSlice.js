import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const org_id = localStorage.getItem("org_id");

export const ridesSlice = createApi({
  reducerPath: "rideApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_DEV_URL }),
  endpoints: (builder) => ({
    getRide: builder.query({
      query: (rideId) => `/organization/${org_id}/getCabById/${rideId}`,
    }),
    getPackage: builder.query({
      query: (rideId) => `/organization/${org_id}/get_packageById/${rideId}`,
    }),
    getJumpstart: builder.query({
      query: (rideId) => `/organization/${org_id}/getJumpstart/${rideId}`,
    }),
  }),
});

export const { useGetRideQuery, useGetPackageQuery, useGetJumpstartQuery } =
  ridesSlice;
