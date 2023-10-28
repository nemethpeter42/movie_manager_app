import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SandboxComponent } from './sandbox/sandbox-component/sandbox.component';

const routes: Routes = [
  {
    path: `sandbox`, 
    component: SandboxComponent,
    children: [],
  },
  

  //INFO creating script: ng generate module movie --route movie --module app.module  
  //see: https://angular.io/guide/lazy-loading-ngmodules
  { path: 'movie', loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
