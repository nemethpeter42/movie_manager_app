
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

// INFO be careful as there is also a type called Event in plain JS
import { NavigationEnd, ActivatedRoute, Event as NavigationEvent, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { State, movieFeature } from 'src/app/reducers/movie/movie.state';
import { Store } from '@ngrx/store';
import { MovieListPageActions } from 'src/app/reducers/movie/movie.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


//TODO create a shell component based on the NgRx tutorial files from Pluralsight

/**
 * @title List of movies component
 */
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements AfterViewInit, OnInit {
  private currRouteSubscription!: Subscription;
  public router: Router
  currUrl: string = ``
  constructor(private route: ActivatedRoute, private _router: Router, private store: Store<State>) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([] as Movie[]);

    this.router = this._router
     this.store.select(movieFeature.selectAll).
      pipe(
        takeUntilDestroyed(),
      ).
      subscribe((movies: Movie[]) => {
        this.dataSource.data = movies 
      })


      // Create 100 users
      //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

      
  }

  ngOnInit(): void {
    this.currRouteSubscription = this._router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        const evt = event as NavigationEnd
        //console.log(evt)
        this.currUrl=evt.url
      }
    });
  }

  ngOnDestroy() {
    //this.moviesSubscription.unsubscribe();
    this.currRouteSubscription.unsubscribe();
  }



  displayedColumns: string[] = ['movieId', 'originalTitle', 'localTitle', 'operations'];
  dataSource: MatTableDataSource<Movie>;

  @ViewChild(MatPaginator) paginator: MatPaginator= <MatPaginator>{};;
  @ViewChild(MatSort) sort: MatSort= <MatSort>{};;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  deleteMovie(id: string) {
    this.store.dispatch(MovieListPageActions.deleteMovie({id}))
  }
}
