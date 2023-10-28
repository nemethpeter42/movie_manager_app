import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
import { DefaultNavbarComponent } from './default-navbar/default-navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
]

@NgModule({
 imports:      [ 
  CommonModule,
  ReactiveFormsModule,
  ...materialModules,
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
    ...materialModules,
  ],
  providers:[
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
})
export class SharedModule { }