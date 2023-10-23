import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

// INFO useful tutorial for tailwind-compatible dark mode:
// https://zoaibkhan.com/blog/angular-material-dark-mode-in-3-steps/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-frontend';
}
