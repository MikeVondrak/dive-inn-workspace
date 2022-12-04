import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter, fromEvent, merge, Observable, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {

  private userScrolled$: Subject<Event> = new Subject<Event>();
  public getUserScrolled$: Observable<Event> = this.userScrolled$.asObservable().pipe(tap(a => console.log('SCROLL', a)));

  private renderer: Renderer2;
  private destroy$: Subject<void> = new Subject();
  private lastUrl: string = '';

  constructor(rendererFactory: RendererFactory2, private router: Router, private location: Location, private utility: UtilityService) {
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
   * 
   */
  private watchScrollEvent() {
    console.log('WATCH SCROLL');

    fromEvent(window, 'scroll').pipe(
      takeUntil(merge(this.destroy$, this.getUserScrolled$)),
      //debounceTime(50)
    ).subscribe((scrollEvent: Event) => {
      console.log('SCROLLED');
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
      //withLatestFrom(this.route.fragment)
    ).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe((navEnd: NavigationEnd) => {
        const url = navEnd.url;
        const route = this.utility.getRouteRootAndFragment(url);
        
        console.log(`scroll service - router event: ${this.lastUrl}, ${route.root} | ${route.fragment}`);
        if (!!route.fragment) {
          this.scrollToElement(route.fragment);
        }
        this.lastUrl = url;
      });
  }

  public scrollToElement(elementId: string | null) {
    if (!!elementId) {
      // TODO: need a setTimeout to wait 1 cycle here, why?
      setTimeout(() => {
        // try to scroll element into view if id exists
        const selector = `#${elementId}`;
        try {
          const el = this.renderer.selectRootElement(selector, true); // preserve contents when selecting
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.watchScrollEvent();
        } catch (err) {
          console.warn(err);
        }
      }, 100); // wait 100ms to scroll for smoother transitions
    }
  }
}
