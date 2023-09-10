import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090/",
    prepareHeaders: (headers) => {
    },
  }),
  tagTypes: ['Movie'],
  endpoints: (builder) => ({
    searchMovies: builder.query({
      query: ({originalTitle, localTitle, page, size, prec, year}) => {
        return ({
          url: 'movie/search',
          method: 'GET',
          params: { 
            originalTitle: originalTitle ?? ``, 
            localTitle: localTitle  ?? ``,
            page: page ?? 0,
            size: size ?? 100,
            prec,
            year,
          }
        });
      },
      providesTags: ['Movie'],
    }),
    /*deleteMovie: builder.query({
      query: ({movieId}) => {
        return ({
          url: 'movie',
          method: 'DELETE',
          body: { 
            movieId,
          }
        });
      },
    }),*/
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `/movie/${id}`,
        method: 'DELETE',
        //credentials: 'include',
      }),
      invalidatesTags: ['Movie'],
    }),
  }),
});

export const { 
  useSearchMoviesQuery,
  useDeleteMovieMutation,
} = moviesApi;