import { EntityState, Update, createEntityAdapter } from '@ngrx/entity';
import { Movie } from '../../models/movie.model';
 
export interface State extends EntityState<Movie> {
  isLoading: boolean;
  selectedMovieId: string | null;
}
 //TODO read through the docs for param sortComparer, is it useful?
const adapter = createEntityAdapter<Movie>({selectId:e=>e.movieId});
 
export const initialState: State = adapter.getInitialState({
  isLoading: false,
  selectedMovieId: null,
});

import { createReducer, on } from '@ngrx/store';
import { MovieApiActions, MovieCreatePageActions,MovieUpdatePageActions, } from './movie.actions';
 
//TODO error messages
const reducer = createReducer(
  initialState,
  on(MovieApiActions.selectMovie, (state, { id, }) =>
    ({...state, selectedMovieId: id,})
  ),
  on(MovieApiActions.addMovieFailure, (state, { error, }) =>
    ({...state, isLoading: false,})
  ),
  on(MovieApiActions.addMovieSuccess, (state, { movie, }) => {
    return adapter.addOne(movie, {...state, isLoading: false,})
  }),
  on(MovieApiActions.updateMovieFailure, (state, { error, }) =>
    ({...state, isLoading: false,})
  ),
  on(MovieApiActions.updateMovieSuccess, (state, { movie, }) =>
    adapter.updateOne({id: movie.movieId, changes: movie}, {...state, isLoading: false, selectedMovieId: null,})
  ),
  on(MovieApiActions.deleteMovieFailure, (state, { error, }) => 
    ({...state, isLoading: false,})
  ),
  on(MovieApiActions.deleteMovieSuccess, (state, {id,}) =>
    adapter.removeOne(id, {...state, isLoading: false,})
  ),
  on(MovieApiActions.getAllMoviesSuccess, (state, { movies, }) => 
    adapter.setAll(movies, {...state, isLoading: false,})
  ),
);

import { createFeature, createSelector } from '@ngrx/store';
     
export const movieFeature = createFeature({
  name: 'movie',
  reducer,
  extraSelectors: ({ selectEntities, selectMovieState,selectSelectedMovieId,selectIsLoading}) => ({
    ...adapter.getSelectors(selectMovieState),
    selectSelectedMovie: createSelector(
      selectSelectedMovieId,
      selectEntities,
      (selectedId, entities) => selectedId ? entities[selectedId] : null
    ),
    /*
    it works, but I rather ignore this approach, and handle pagination at the material table
    selectOnePage: createSelector(
      adapter.getSelectors(selectMovieState).selectAll,
      (entities) => entities.slice(0,5)
    ),
    */
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