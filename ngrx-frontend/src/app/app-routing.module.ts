import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SandboxComponent } from './sandbox/sandbox-component/sandbox.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieCreateComponent } from './movie/movie-create/movie-create.component';
import { MovieUpdateComponent } from './movie/movie-update/movie-update.component';

const routes: Routes = [
  {
    path: `sandbox`, 
    component: SandboxComponent,
    children: [],
  },
  {
    path: `movie`, 
    component: MovieListComponent,
    children: [
      {
        path: `create`, 
        component: MovieCreateComponent,
      },
      {
        path: `update/:id`, 
        component: MovieUpdateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
