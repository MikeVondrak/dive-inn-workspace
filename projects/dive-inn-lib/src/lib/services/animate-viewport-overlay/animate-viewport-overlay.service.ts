import { Injectable } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { ViewportOverlayState } from '../../models/viewport-overlay.model';
import { ScrollService } from '../scroll/scroll.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AnimateViewportOverlayService {

  // current route being navigated to
  private route: string = '';

  public viewportOverlayState$: BehaviorSubject<ViewportOverlayState> = new BehaviorSubject<ViewportOverlayState>(ViewportOverlayState.SHOW);

  constructor(private router: Router, private scroll: ScrollService, private utility: UtilityService) {
    this.watchRoute();
    //this.prepareForRouteChange();
  }

  /**
   * Initiate the viewport overlay removal animation when navigation has completed
   */
  private watchRoute() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((eventNavEnd: NavigationEnd) => {
      this.viewportOverlayState$.next(ViewportOverlayState.HIDE);
    });
  }

  /**
   * Check if a route is new and needs to trigger the viewport overlay or scrolling
   * @param newRoute new url to route to
   */
  public prepareForRouteChange(newRoute: string) {
    // if the routes are identical don't scroll
    // @TODO: set up flag to clear on user scroll and allow re-scrolling using the button after they've moved the screen
    if (this.route !== newRoute) {
      const newRouteParts = this.utility.getRouteRootAndFragment(newRoute);
      const oldRouteParts = this.utility.getRouteRootAndFragment(this.route);
      
      this.route = newRoute;
      if ((oldRouteParts.root !== newRouteParts.root) && (oldRouteParts.root !== '')) {
        // if this is a different route, hide the screen with the viewport overlay before navigating
        this.viewportOverlayState$.next(ViewportOverlayState.SHOW);
      } else if (oldRouteParts.fragment !== newRouteParts.fragment) {
        // if route root is the same but fragment is different, scroll to element
        this.scroll.scrollToElement(newRouteParts.fragment);
      }
    }
  }

  /**
   * Check for correct state and navigate to new route
   * @param event Angular animation event
   */
  public changeRoute(event: AnimationEvent) {
    if (!!this.route && event.toState === ViewportOverlayState.SHOW) {
      this.router.navigateByUrl(this.route);
    }
  }
}
