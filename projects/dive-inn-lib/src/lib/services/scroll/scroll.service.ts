import { Inject, Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter, fromEvent, merge, Observable, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {

  private userScrolled$: Subject<Event> = new Subject<Event>();
  public getUserScrolled$: Observable<Event> = this.userScrolled$.asObservable();
  private renderer: Renderer2;
  private destroy$: Subject<void> = new Subject();
  private lastUrl: string = '';

  constructor(@Inject(DOCUMENT) private document: Document, rendererFactory: RendererFactory2, private router: Router, private location: Location, private utility: UtilityService) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.watchRouterEvents();
    //this.watchScrollEvent();
  }

  /**
   * Implement ngOnDestroy since this is a library and could be destroyed
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Watch for user to scroll to clear the route fragment to allow re-scrolling to the same element
   */
  private watchScrollEvent() {
    fromEvent(window, 'scroll').pipe(
      takeUntil(merge(this.destroy$, this.getUserScrolled$)),
      //debounceTime(50)
    ).subscribe((scrollEvent: Event) => {
      const route = this.utility.getRouteRootAndFragment(this.lastUrl);
      this.location.replaceState(route.root);
      this.userScrolled$.next(scrollEvent);
    });
  }

  /**
   * Every time a new route is processed check if the fragment is different
   * and if so scroll to the element with that ID
   */
  private watchRouterEvents() {
    // on every navigation end get the fragment
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe((navEnd: NavigationEnd) => {
        const url = navEnd.url;
        const route = this.utility.getRouteRootAndFragment(url);
        if (!!route?.fragment) {
            this.scrollToElement(route.fragment);
        }
        this.lastUrl = url;
      });
  }

  /**
   * Waits some time (for page load) and then scrolls to the element with elementId
   */
  public scrollToElement(elementId: string | null) {
    if (!!elementId) {
      // wait 100ms to scroll for smoother transitions
      setTimeout(() => {
        // try to scroll element into view if id exists
        const selector = `#${elementId}`;        
        try {
          const el = this.document.getElementById(elementId);
          if (!!el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.watchScrollEvent();
          }
        } catch (err) {
          console.warn(err);
        }
      }, 100);
    }
  }
}
