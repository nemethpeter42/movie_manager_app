import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumberValidators } from 'src/app/validators/NumberValidators';
import { ActionsSubject, Store } from '@ngrx/store';
import { Actions, ofType } from "@ngrx/effects";
import { Subscription, tap } from 'rxjs';
import { MovieApiActions, MovieCreatePageActions } from 'src/app/reducers/movie/movie.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent {
  movieForm: FormGroup;
  //no longer used, see below
  //successSubscription: Subscription;

  constructor(public fb: FormBuilder,private _router: Router,private actions$: Actions, private _store: Store) {
    //this.successSubscription = 
    this.actions$.pipe(
      ofType(MovieApiActions.addMovieSuccess),
      tap(console.log),
      takeUntilDestroyed(),
    ).subscribe(data => {
      this._router.navigate([`/movie`])
    });
    this.movieForm = this.fb.group({
      originalTitle: [{value: ``, disabled: false,}, [Validators.required,]],
      localTitle: [{value: ``, disabled: false,}, [Validators.required,]],
      prec: [{value: ``, disabled: false,}, []],
      rating: [{value: ``, disabled: false,}, [Validators.required,NumberValidators.intBetween(0,10)]],
      releaseYear:[{value: ``, disabled: false,}, [Validators.required,NumberValidators.intBetween(1800, 3000)]],
    })
  }
  ngOnInit(): void {
    
  }

  // we no longer need this boilerplate, because of the new
  // takeUntilDestroyed() rxjs operation
  /*ngOnDestroy() {
    this.successSubscription.unsubscribe();
  }*/
  submitForm() {
    this._store.dispatch(MovieCreatePageActions.addMovie({
      movie: {
        originalTitle: this.movieForm.get(`originalTitle`)?.value,
        localTitle: this.movieForm.get(`localTitle`)?.value,
        prec: this.movieForm.get(`prec`)?.value!==`` ? this.movieForm.get(`prec`)?.value : undefined,
        rating: +this.movieForm.get(`rating`)?.value,
        releaseInfo: {year:  +this.movieForm.get(`releaseYear`)?.value,},
      } as Movie
    }))
  }
  
}
