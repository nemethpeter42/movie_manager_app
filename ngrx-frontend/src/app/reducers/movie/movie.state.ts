import { EntityState, Update, createEntityAdapter } from '@ngrx/entity';
import { Movie } from '../../models/movie.model';
 
export interface State extends EntityState<Movie> {
  isLoading: boolean;
  //selectedMovieId: string | null;
}
 //TODO read through the docs for param sortComparer, is it useful?
const adapter = createEntityAdapter<Movie>({selectId:e=>e.movieId});
 
export const initialState: State = adapter.getInitialState({
  isLoading: false,
  //selectedMovieId: null,
});

import { createReducer, on } from '@ngrx/store';
import { MovieApiActions, MovieCreatePageActions,MovieUpdatePageActions, } from './movie.actions';
 
const reducer = createReducer(
  initialState,
  on(MovieApiActions.addMovieSuccess, (state, { movie, }) =>
    adapter.addOne(movie, {...state,})
  ),
  on(MovieApiActions.updateMovieSuccess, (state, { movie, }) =>
    adapter.updateOne({id: movie.movieId, changes: movie}, {...state,})
  ),
  on(MovieApiActions.getAllMoviesSuccess, (state, { movies, }) => 
    adapter.setAll(movies, state)
  ),
);

import { createFeature, createSelector } from '@ngrx/store';
     
export const movieFeature = createFeature({
  name: 'movie',
  reducer,
  extraSelectors: ({ selectEntities, selectMovieState, }) => ({
    ...adapter.getSelectors(selectMovieState),

    /*selectIsUserSelected: createSelector(
      selectIsLoading,
      (selectedId) => selectedId !== null
    ),
    selectSelectedUser: createSelector(
      selectSelectedUserId,
      selectEntities,
      (selectedId, entities) => selectedId ? entities[selectedId] : null
    ),*/
  }),
});