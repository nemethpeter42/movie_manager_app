import { Component, OnDestroy } from '@angular/core';

// INFO be careful as there is also a type called Event in plain JS
import { NavigationEnd, ActivatedRoute, Event as NavigationEvent, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-default-navbar',
  templateUrl: './default-navbar.component.html',
  styleUrls: ['./default-navbar.component.scss']
})
export class DefaultNavbarComponent implements OnDestroy {
  private currRoute$: Subscription;
  public router: Router
  currUrl: string = ``
  constructor(private route: ActivatedRoute, private _router: Router) {
    this.router = _router
    this.currRoute$ = _router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        const evt = event as NavigationEnd
        //console.log(evt)
        this.currUrl=evt.url
      }
    });
  }

  ngOnDestroy() {
    this.currRoute$.unsubscribe();
  }
  
}
