import { Observable, catchError, exhaustMap, map, of, switchMap, } from "rxjs";
import {
  MovieApiActions, 
  MovieCreatePageActions, 
  MovieUpdatePageActions, 
  MovieListPageActions,
} from './movie.actions'
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Movie } from "../../models/movie.model";
import { MovieService } from "src/app/movie/services/movie.service";

//TODO rename itt to getAllMovies
export const getAllMovies = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)): Observable<Action> => {
    return actions$.pipe(
      ofType(MovieListPageActions.getAllMovies),
      switchMap(() => 
        movieService.getAll().pipe(
          map((data) => {
            return MovieApiActions.getAllMoviesSuccess({ movies: data, });
          }),
          catchError((error: any) => {
            return of(MovieApiActions.getAllMoviesFailure({error}));
          })
        )
      )
    )
  }, {functional: true,}
);

export const addMovie = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)): Observable<Action> => {
    return actions$.pipe(
      ofType(MovieCreatePageActions.addMovie),
      exhaustMap(action => 
        movieService.save(action.movie).pipe(
          map((movie) => {
            return MovieApiActions.addMovieSuccess({ movie, });
          }),
          catchError((error: any) => {
            return of(MovieApiActions.addMovieFailure({error}));
          })
        )
      )
    )
  }, {functional: true,}
);

export const updateMovie = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)): Observable<Action> => {
    return actions$.pipe(
      ofType(MovieUpdatePageActions.updateMovie),
      exhaustMap(action => 
        movieService.save(action.movie).pipe(
          map((movie) => {
            return MovieApiActions.updateMovieSuccess({ movie, });
          }),
          catchError((error: any) => {
            return of(MovieApiActions.updateMovieFailure({error}));
          })
        )
      )
    )
  }, {functional: true,}
);


export const deleteMovie = createEffect(
  (actions$ = inject(Actions), movieService = inject(MovieService)): Observable<Action> => {
    return actions$.pipe(
      ofType(MovieListPageActions.deleteMovie),
      exhaustMap(action => 
        movieService.delete(action.id).pipe(
          map(() => {
            return MovieApiActions.deleteMovieSuccess({ id: action.id});
          }),
          catchError((error: any) => {
            return of(MovieApiActions.deleteMovieFailure({error}));
          })
        )
      )
    )
  }, {functional: true,}
);

