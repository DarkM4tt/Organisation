import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ridesSlice = createApi({
  reducerPath: 'rideApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://boldrides.com/api/boldriders/' }),
  endpoints: (builder) => ({
    getRide: builder.query({
      query: (rideId) => `/organization/668811bfbaa2b258ab50fbe3/ride/${rideId}`,
    }),
  }),
});

export const { useGetRideQuery } = ridesSlice;
