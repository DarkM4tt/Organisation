import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const getOrgId = () => localStorage.getItem("org_id");

export const zonesSlice = createApi({
  reducerPath: "zonesApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_DEV_URL }),
  endpoints: (builder) => ({
    getZones: builder.query({
      query: () => `/organization/${getOrgId()}/zones`,
    }),
    updateZone: builder.mutation({
      query: ({ id, updatedZone }) => ({
        url: `organization/${getOrgId()}/zone/${id}`,
        method: "PUT",
        body: updatedZone,
      }),
    }),
    deleteZone: builder.mutation({
      query: (id) => ({
        url: `organization/${getOrgId()}/zone/${id}`,
        method: "DELETE",
      }),
    }),
    toggleZoneStatus: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `organization/${getOrgId()}/toggleZoneStatus/${id}`,
        method: "POST",
        body: { is_active },
      }),
    }),
    addZone: builder.mutation({
      query: (newZone) => ({
        url: `organization/${getOrgId()}/createZone`,
        method: "POST",
        body: newZone,
      }),
    }),
    getZonePrices: builder.query({
      query: (zid) => ({
        url: `/organization/${getOrgId()}/zoneprices`,
        method: "GET",
        params: { zid },
      }),
    }),
  }),
});

export const {
  useGetZonesQuery,
  useUpdateZoneMutation,
  useDeleteZoneMutation,
  useToggleZoneStatusMutation,
  useAddZoneMutation,
  useGetZonePricesQuery,
} = zonesSlice;
