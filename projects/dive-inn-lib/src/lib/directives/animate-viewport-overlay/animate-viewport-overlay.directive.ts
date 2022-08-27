import { Directive, HostListener, Input } from '@angular/core';
import { AnimateViewportOverlayService } from '../../services/animate-viewport-overlay/animate-viewport-overlay.service';

@Directive({
  selector: '[appAnimateViewportOverlay]'
})
export class AnimateViewportOverlayDirective {

  @Input('appAnimateViewportOverlay') route: string = '';

  @HostListener('click', ['$event']) onClick(event: PointerEvent) {
    
    console.log('DIRECTIVE CLICK', this.route);
    
    if (!!this.route) {
      this.animateViewportOverlay.prepareForRouteChange(this.route);
    }
  }

  constructor(private animateViewportOverlay: AnimateViewportOverlayService) { }

}
