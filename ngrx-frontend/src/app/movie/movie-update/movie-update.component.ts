import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberValidators } from 'src/app/validators/NumberValidators';
import { ActionsSubject, Store } from '@ngrx/store';
import { Actions, ofType } from "@ngrx/effects";
import { Subscription, tap } from 'rxjs';
import { MovieApiActions, MovieCreatePageActions, MovieUpdatePageActions } from 'src/app/reducers/movie/movie.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Movie } from 'src/app/models/movie.model';
import { movieFeature } from 'src/app/reducers/movie/movie.state';


@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.scss']
})
export class MovieUpdateComponent {
  movieForm: FormGroup;
  //no longer used, see below
  //successSubscription: Subscription;

  constructor(public fb: FormBuilder,private _router: Router,private actions$: Actions, private _store: Store, private route: ActivatedRoute) {
    
    this.movieForm = this.fb.group({
      movieId: [{value: ``, disabled: false,}, [Validators.required,]],
      originalTitle: [{value: ``, disabled: false,}, [Validators.required,]],
      localTitle: [{value: ``, disabled: false,}, [Validators.required,]],
      prec: [{value: ``, disabled: false,}, []],
      rating: [{value: ``, disabled: false,}, [Validators.required,NumberValidators.intBetween(0,10)]],
      releaseYear:[{value: ``, disabled: false,}, [Validators.required,NumberValidators.intBetween(1800, 3000)]],
    })
    this.actions$.pipe(
      ofType(MovieApiActions.updateMovieSuccess),
      //tap(console.log),
      takeUntilDestroyed(),
    ).subscribe(data => {
      this._router.navigate([`/movie`])
    });
    this._store.select(movieFeature.selectSelectedMovie).pipe(
      takeUntilDestroyed()
    ).subscribe(movie => {
      console.log(movie)
      console.log(this.movieForm)
      if (movie) {
        this.movieForm.setValue({
          movieId: movie.movieId,
          originalTitle: movie.originalTitle,
          localTitle: movie.localTitle,
          prec: movie.prec,
          rating: movie.rating,
          releaseYear: movie.releaseInfo.year,
        })
       
      } else {
        this.movieForm.reset()
      }
    });
    this.route.params.pipe(
      takeUntilDestroyed(),
    ).subscribe(params => {
      const id = params[`id`] ?? `` as string
      this._store.dispatch(MovieApiActions.selectMovie({id,}))
    })

  }
  ngOnInit(): void {
    
  }

  submitForm() {
    this._store.dispatch(MovieUpdatePageActions.updateMovie({
      movie: {
        movieId: this.movieForm.get(`movieId`)?.value,
        originalTitle: this.movieForm.get(`originalTitle`)?.value,
        localTitle: this.movieForm.get(`localTitle`)?.value,
        prec: this.movieForm.get(`prec`)?.value!==`` ? this.movieForm.get(`prec`)?.value : undefined,
        rating: +this.movieForm.get(`rating`)?.value,
        releaseInfo: {year:  +this.movieForm.get(`releaseYear`)?.value,},
      } as Movie
    }))
  }
  
}
