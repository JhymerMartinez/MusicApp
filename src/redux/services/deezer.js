import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    // Proxy Server
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
  }),
  endpoints: (builder) => ({
    getTopSongsByGenre: builder.query({
      query: ({ genreId = 0, ...restParams } = {}) => ({ // default ID=0 All
        url: `/chart/${genreId}/tracks`,
        method: 'GET',
        params: {
          limit: 20,
          output: 'json',
          ...restParams,
        },
      }),
      transformResponse: (res) => res.data || [],
    }),
    getTopArtistsByGenre: builder.query({
      query: ({ genreId = 0, ...restParams } = {}) => ({ // default ID=132 Pop
        url: `/chart/${genreId}/artists`,
        method: 'GET',
        params: {
          limit: 20,
          output: 'json',
          ...restParams,
        },
      }),
      transformResponse: (res) => res.data || [],
    }),
    getSongDetails: builder.query({
      query: ({ songId }) => ({
        url: `/track/${songId}`,
        method: 'GET',
        params: {
          output: 'json',
        },
      }),
    }),
    getRelatedArtists: builder.query({
      query: ({ artistId, ...restParams }) => ({
        url: `/artist/${artistId}/related`,
        method: 'GET',
        params: {
          limit: 10,
          output: 'json',
          ...restParams,
        },
      }),
      transformResponse: (res) => res.data || [],
    }),
    getTopSongsByArtist: builder.query({
      query: ({ artistId, ...restParams }) => ({
        url: `/artist/${artistId}/top`,
        method: 'GET',
        params: {
          limit: 10,
          output: 'json',
          ...restParams,
        },
      }),
      transformResponse: (res) => res.data || [],
    }),
    getArtistDetails: builder.query({
      query: ({ artistId }) => ({
        url: `/artist/${artistId}`,
        method: 'GET',
        params: {
          output: 'json',
        },
      }),
    }),
    getRelatedArtistsByArtist: builder.query({
      query: ({ artistId, ...restParams }) => ({
        url: `/artist/${artistId}/related`,
        method: 'GET',
        params: {
          limit: 10,
          output: 'json',
          ...restParams,
        },
      }),
      transformResponse: (res) => res.data || [],
    }),
    getSongsBySearch: builder.query({
      query: ({ searchTerm, ...restParams }) => ({
        url: '/search',
        method: 'GET',
        params: {
          q: searchTerm,
          limit: 20,
          output: 'json',
          ...restParams,
        },
      }),
      transformResponse: (res) => res.data || [],
    }),
  }),
});

export const {
  useGetTopSongsByGenreQuery,
  useGetTopArtistsByGenreQuery,
  useGetSongDetailsQuery,
  useGetRelatedArtistsQuery,
  useGetTopSongsByArtistQuery,
  useGetArtistDetailsQuery,
  useGetRelatedArtistsByArtistQuery,
  useGetSongsBySearchQuery,
} = deezerApi;
