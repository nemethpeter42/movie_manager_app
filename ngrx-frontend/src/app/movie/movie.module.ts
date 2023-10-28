import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieCreateComponent,
    MovieUpdateComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule,
  ]
})
export class MovieModule { }
