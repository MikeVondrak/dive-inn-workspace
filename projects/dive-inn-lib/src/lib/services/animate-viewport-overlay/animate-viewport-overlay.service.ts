import { Injectable } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { ViewportOverlayState } from '../../models/viewport-overlay.model';

@Injectable({
  providedIn: 'root'
})
export class AnimateViewportOverlayService {

  private nextRoute: string = '';

  public viewportOverlayState$: BehaviorSubject<ViewportOverlayState> = new BehaviorSubject<ViewportOverlayState>(ViewportOverlayState.SHOW);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((eventNavEnd: NavigationEnd) => {
      
      console.log('NAV END: ', eventNavEnd.url);
      
      this.viewportOverlayState$.next(ViewportOverlayState.HIDE);
    });
  }

  public prepareForRouteChange(route: string) {
    
    console.log('Prep for route change', {route});
    if (this.nextRoute !== route) {
      this.nextRoute = route;
      this.viewportOverlayState$.next(ViewportOverlayState.SHOW);
    }
  }

  public changeRoute(event: AnimationEvent) {
    
    console.log('CHANGE ROUTE', `next: ${this.nextRoute}`, `event: ${event.toState}`);
    
    if (!!this.nextRoute && event.toState === ViewportOverlayState.SHOW) {
      
      console.log('CHANGING ROUTE', this.nextRoute);
      
      this.router.navigateByUrl(this.nextRoute);
    } else {
      
      console.warn('changeRoute skipped', );
      
    }
  }

  
}
