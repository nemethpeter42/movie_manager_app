
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

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

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
  movies$!: Observable<Movie[]>;
  private currRoute$: Subscription;
  public router: Router
  currUrl: string = ``
  constructor(private route: ActivatedRoute, private _router: Router, private store: Store<State>) {
    this.router = this._router
    this.currRoute$ = _router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        const evt = event as NavigationEnd
        //console.log(evt)
        this.currUrl=evt.url
      }
    });

      // Create 100 users
      const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.movies$ = this.store.select(movieFeature.selectAll);

    this.store.dispatch(MovieListPageActions.getAllMovies());
  }

  ngOnDestroy() {
    this.currRoute$.unsubscribe();
  }



  displayedColumns: string[] = ['id', 'originalTitle', 'localTitle', 'fruit', 'operations'];
  dataSource: MatTableDataSource<UserData>;

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
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}