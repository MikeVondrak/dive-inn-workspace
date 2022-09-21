import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { routeAnimations } from './animations/route.animation';
import { AnimateViewportOverlayService } from '@dive-inn-lib';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  public viewportOverlayAnimationState$ = this.viewportOverlay.viewportOverlayState$;

  constructor(private viewportOverlay: AnimateViewportOverlayService) {
  }

  public viewportOverlayAnimationDone(event: AnimationEvent) {
    console.log('Animation Done', event.fromState, event.toState);
    this.viewportOverlay.changeRoute(event);
  }

  
}
