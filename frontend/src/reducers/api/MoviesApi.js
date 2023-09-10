import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8090/",
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*')
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

    findAllById: builder.query({
      query: ({ids}) => {
        return ({
          url: 'movie/findAllById',
          method: 'GET',
          params: { 
            ids,
          }
        })
      },
      providesTags: ['Movie'],
    }),
    saveMovie: builder.mutation({
      query: ({movieId, originalTitle, localTitle, prec, releaseInfo, rating,}) => ({
        url: `/movie`,
        method: 'POST',
        body: {
          movieId,
          originalTitle, 
          localTitle, 
          prec, 
          releaseInfo, 
          rating,
          comments:[],
        },
        responseHandler: "text", // by default RTK Query treats it as JSON, so unwrap fails 
        //credentials: 'include',
      }),
      invalidatesTags: ['Movie'],
    }),
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
  useSaveMovieMutation,
  useLazyFindAllByIdQuery,
} = moviesApi;