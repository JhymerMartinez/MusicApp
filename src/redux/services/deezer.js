import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    // Proxy Server
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getTopChart: builder.query({
      query: () => ({
        url: '/chart/132/tracks?output=json&limit=20', // ID=132 Pop
        method: 'GET',
      }),
      transformResponse: (res) => res.data || [],
    }),
    getSongDetails: builder.query({
      query: ({ songId }) => ({
        url: `/track/${songId}?output=json`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetTopChartQuery,
  useGetSongDetailsQuery,
} = deezerApi;
