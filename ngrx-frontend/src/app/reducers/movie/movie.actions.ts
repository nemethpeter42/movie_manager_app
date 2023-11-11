import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';

//TODO continue developing from this tutorial https://ngrx.io/guide/store/actions

export const createMovie = createAction(
  '[Create Movie Page] Create Movie',
  props<{ originalTitle: string; localTitle: string }>()
);

export const MovieCreatePageActions = createActionGroup({
  source: 'Movie Create Page',
  events: {
    addMovie: props<{ movie: Movie }>(),
  },
})

export const MovieUpdatePageActions = createActionGroup({
  source: 'Movie Update Page',
  events: {
    updateMovie: props<{ movie: Movie }>(),
  },
})


export const MovieListPageActions = createActionGroup({
  source: 'Movie List Page',
  events: {
    getAllMovies: emptyProps(),
    deleteMovie: props<{ id: string }>(),
  },
})


export const MovieApiActions = createActionGroup({
  source: 'Movie API',
  events: {
    addMovieSuccess: props<{ movie: Movie }>(),
    addMovieFailure: props<{ error: any }>(),
    updateMovieSuccess: props<{ movie: Movie }>(),
    updateMovieFailure: props<{ error: any }>(),
    deleteMovieSuccess: props<{ id: string }>(),
    deleteMovieFailure: props<{ error: any }>(),
    getAllMoviesSuccess: props<{ movies: Movie [] }>(),
    getAllMoviesFailure: props<{ error: any }>(),
  },
})