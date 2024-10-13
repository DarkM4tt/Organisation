// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getOrgId } from '../Zones/zonesSlice';

export const vehicleSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://boldrides.com/api/boldriders/' }),
  endpoints: (builder) => ({
    getCarCategories: builder.query({
      query: () => `organization/${getOrgId()}/vehicleCategories`,
    }),
    updateVehicle: builder.mutation({
      query: ({ vehicleId, data }) => ({
        url: `/organization/${getOrgId()}/vehicle/${vehicleId}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useGetCarCategoriesQuery, useUpdateVehicleMutation} = vehicleSlice;
