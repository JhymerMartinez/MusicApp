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
    getRelatedArtists: builder.query({
      query: ({ artistId }) => ({
        url: `/artist/${artistId}/related?output=json&limit=10`,
        method: 'GET',
      }),
      transformResponse: (res) => res.data || [],
    }),
    getTopSongsByArtist: builder.query({
      query: ({ artistId }) => ({
        url: `/artist/${artistId}/top?output=json&limit=10`,
        method: 'GET',
      }),
      transformResponse: (res) => res.data || [],
    }),
    getArtistDetails: builder.query({
      query: ({ artistId }) => ({
        url: `/artist/${artistId}?output=json`,
        method: 'GET',
      }),
    }),
    getRelatedArtistsByArtist: builder.query({
      query: ({ artistId }) => ({
        url: `/artist/${artistId}/related?output=json&limit=10`,
        method: 'GET',
      }),
      transformResponse: (res) => res.data || [],
    }),
  }),
});

export const {
  useGetTopChartQuery,
  useGetSongDetailsQuery,
  useGetRelatedArtistsQuery,
  useGetTopSongsByArtistQuery,
  useGetArtistDetailsQuery,
  useGetRelatedArtistsByArtistQuery,
} = deezerApi;
