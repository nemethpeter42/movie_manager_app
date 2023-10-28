import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';

const routes: Routes = [
  {
    path: ``,
    component: MovieListComponent,
  },
  {
    path: `create`, 
    component: MovieCreateComponent,
  },
  {
    path: `update/:id`, 
    component: MovieUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
