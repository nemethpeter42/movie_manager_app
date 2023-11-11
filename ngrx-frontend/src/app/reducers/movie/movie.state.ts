import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Movie } from '../../models/movie.model';
 
export interface State extends EntityState<Movie> {
  isLoading: boolean;
  //selectedMovieId: string | null;
}
 
const adapter = createEntityAdapter<Movie>();
 
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