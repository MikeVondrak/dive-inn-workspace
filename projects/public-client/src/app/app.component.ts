import { ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { routeAnimations } from './animations/route.animation';
import { AnimateViewportOverlayService } from '@dive-inn-lib';
import { combineLatest, filter, withLatestFrom } from 'rxjs';


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

  //private routeFragment: string | null = null;

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
    // this.route.fragment.subscribe(fragment => this.routeFragment = fragment);
    // this.router.events.subscribe(event => { if (event instanceof NavigationEnd) { this.scrollToElement(); } });
    this.route.fragment.subscribe((fragment) => {
      
      console.log('APP FRAG', fragment);
      
      if (!!fragment) {
        this.scrollToElement(fragment);
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    //   withLatestFrom(this.route.fragment)
    ).subscribe((navEnd) => {
      console.log('APP NAV END');
    });
    //   this.scrollToElement(fragment);
    // });
  }

  private scrollToElement(routeFragment: string | null) {

    // TODO: need a setTimeout to wait 1 cycle here, why?
    setTimeout(() => {
      // try to scroll element into view if fragment exists
      if (!!routeFragment) {
        const selector = `#${routeFragment}`;
        try {
          const el = this.renderer.selectRootElement(selector, true); // preserve contents when selecting
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (err) {
          console.warn(err);
        }
      }
    }, 0);
  }
}
