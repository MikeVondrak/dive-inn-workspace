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
    console.log('Animation Done', event.fromState, event.toState);
    this.viewportOverlay.changeRoute(event);
  }

  // every time a new route is processed grab the #fragment if there is one
  private watchscrollToFragment() {
    // this.route.fragment.subscribe(fragment => this.routeFragment = fragment);
    // this.router.events.subscribe(event => { if (event instanceof NavigationEnd) { this.scrollToElement(); } });
    combineLatest([
      //this.router.events.pipe(filter(event => event instanceof NavigationEnd)),
      this.route.fragment,
    ]).subscribe(( fragment) => {
      const f = fragment[0];
      console.log('ffffffffffff', f);
      this.scrollToElement(f);
    });

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    //   withLatestFrom(this.route.fragment)
    // ).subscribe(([navEnd, fragment]) => {
    //   this.scrollToElement(fragment);
    // });
  }

  private scrollToElement(routeFragment: string | null) {
    console.log('!!!!!!!!!!', routeFragment);
    setTimeout(() => {
      // try to scroll element into view if fragment exists
    if (routeFragment) {
      const selector = `#${routeFragment}`;
      try {
        const el = this.renderer.selectRootElement(selector, true); // preserve contents when selecting
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch(err) {
        console.error(err);
      }
    }
    }, 300); // wait for route change animation to finish or dom to load?, scroll won't do anything if dom is not ready
    // @TODO - better way to do this?
  }
}
