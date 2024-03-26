import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieListPageActions } from 'src/app/reducers/movie/movie.actions';
import { State } from 'src/app/reducers/movie/movie.state';

@Component({
  selector: 'app-movie-common',
  templateUrl: './movie-common.component.html',
  styleUrl: './movie-common.component.scss'
})
export class MovieCommonComponent {
  constructor(private store: Store<State>) {
    this.store.dispatch(MovieListPageActions.getAllMovies());
  }
}
