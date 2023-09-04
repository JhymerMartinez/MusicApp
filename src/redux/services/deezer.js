import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    // Proxy Server
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getChart: builder.query({
      query: () => ({
        url: '/chart/0?output=json',
      }),
    }),
  }),
});

export const {
  useGetChartQuery,
} = deezerApi;
