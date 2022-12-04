import { ChangeDetectionStrategy, Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, ChildActivationEnd, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { routeAnimations } from './animations/route.animation';
import { AnimateViewportOverlayService, ScrollService } from '@dive-inn-lib';
import { combineLatest, filter, map, Subject, take, takeUntil, withLatestFrom } from 'rxjs';
import { ExpandingMenuStateEnum } from './models/expanding-menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  public viewportOverlayAnimationState$ = this.viewportOverlay.viewportOverlayState$;
  public preventScrollOnMainElement: boolean = false;

  // TODO - pre-Angular loader
  //private appReadyEvent: AppReadyEvent;
  private lastUrl: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private viewportOverlay: AnimateViewportOverlayService,
    private scroll: ScrollService,
  ) {
    // start the scroll service watching router events
    // this.scroll.watchRouterEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // TODO - pre-Angular loader
  // ngAfterViewInit(): void {
  //   this.appReadyEvent.trigger(); // remove the "Loading..." overlay when app is ready    
  // }
  
  /**
   * Callback for viewport animation complete
   * @param event AnimationEvent from Angular animation
   */
  public viewportOverlayAnimationDone(event: AnimationEvent) {
    // Change route via service so viewport overlay will be removed
    this.viewportOverlay.changeRoute(event);
  }

  public onFooterMenuStateChange(state: ExpandingMenuStateEnum) {
    if (state === ExpandingMenuStateEnum.OPEN) {
      this.renderer.addClass(this.document.body, 'prevent-scroll');
    } else {
      this.renderer.removeClass(this.document.body, 'prevent-scroll');
    }
    
  }

}
