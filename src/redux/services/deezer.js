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
        url: '/chart/132?output=json', // ID=132 Pop
      }),
    }),
  }),
});

export const {
  useGetChartQuery,
} = deezerApi;
