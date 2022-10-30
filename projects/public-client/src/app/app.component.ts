import { ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { routeAnimations } from './animations/route.animation';
import { AnimateViewportOverlayService } from '@dive-inn-lib';
import { combineLatest, filter, map, Subject, take, takeUntil, withLatestFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  public viewportOverlayAnimationState$ = this.viewportOverlay.viewportOverlayState$;

  // TODO - pre-Angular loader
  //private appReadyEvent: AppReadyEvent;
  private lastUrl: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private viewportOverlay: AnimateViewportOverlayService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) {
    this.watchscrollToFragment();
  }

  // TODO - pre-Angular loader
  // ngAfterViewInit(): void {
  //   this.appReadyEvent.trigger(); // remove the "Loading..." overlay when app is ready    
  // }

  public viewportOverlayAnimationDone(event: AnimationEvent) {
    this.viewportOverlay.changeRoute(event);
  }

  // every time a new route is processed grab the #fragment if there is one
  private watchscrollToFragment() {
    
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      withLatestFrom(this.route.fragment)
    ).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(([navEnd, frag]) => {
      const url = navEnd.url;
      if (!!frag) {
        this.scrollToElement(frag);
      }
      this.lastUrl = url;
    });
  }

  private scrollToElement(routeFragment: string | null) {

    // TODO: need a setTimeout to wait 1 cycle here, why?
    setTimeout(() => {
      // try to scroll element into view if fragment exists
      if (!!routeFragment) {
        const selector = `#${routeFragment}`;
        try {
          const el = this.renderer.selectRootElement(selector, true); // preserve contents when selecting

          console.log('APP - scrolling to: ', el);

          el.scrollIntoView({ behavior: 'smooth', block: 'start' });          
        } catch (err) {
          console.warn(err);
        }
      }
    }, 100); // wait 100ms to scroll for smoother transitions
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
