import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { zonesSlice } from "../features/Zones/zonesSlice";
import { vehicleSlice } from "../features/Vehicle/vehicleSlice";
import { ridesSlice } from "../features/Rides/ridesSlice";

export const store = configureStore({
  reducer: {
    // Add the api reducer to the store
    [authSlice.reducerPath]: authSlice.reducer,
    [zonesSlice.reducerPath]: zonesSlice.reducer,
    [vehicleSlice.reducerPath]: vehicleSlice.reducer,
    [ridesSlice.reducerPath]: ridesSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
      zonesSlice.middleware,
      vehicleSlice.middleware,
      ridesSlice.middleware
    ),
});
