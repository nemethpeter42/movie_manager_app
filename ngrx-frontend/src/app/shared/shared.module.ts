import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
import { DefaultNavbarComponent } from './default-navbar/default-navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
 imports:      [ 
  CommonModule,
  MatToolbarModule,
  MatIconModule,
  MatSlideToggleModule,
  ReactiveFormsModule,
],
 declarations: [ 
   DarkModeToggleComponent, 
   DefaultNavbarComponent,
 ],
 exports: [
    DarkModeToggleComponent,
    DefaultNavbarComponent,
    CommonModule, 
    ReactiveFormsModule,  
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
  ]
})
export class SharedModule { }