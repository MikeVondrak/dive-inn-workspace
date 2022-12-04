import { Directive, ElementRef, HostListener, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appMouseTracker]'
})
export class MouseTrackerDirective implements OnInit, OnDestroy {

  private mousemoveSub?: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private mouseMove(event: MouseEvent) {    
    const transformAmount = 5; // % 3d rotation
    
    const mouseX = event.x;
    const mouseY = event.y;
    const elWidth = event.view?.innerWidth;
    const elHeight = event.view?.innerHeight;
    const dX = mouseX / (elWidth || 1); // % along axis
    const dY = mouseY / (elHeight || 1);
    const dfcX = dX - 0.50; // % dist on X - 50%
    const dfcY = dY - 0.50; // % dist on Y - 50%
    const tX = dfcX * transformAmount * 2;
    const tY = dfcY * transformAmount * 2;
    
    const axisX = dfcX > 0 ? 1 : -1;
    const axisY = dfcY > 0 ? 1 : -1;

    const styleStr = `rotateX(${-tY}deg) rotateY(${tX}deg) translateZ(100px) scale(1.15)`;
    this.renderer.setStyle(this.el.nativeElement, 'transformStyle', 'preserve-3d');
    this.renderer.setStyle(this.el.nativeElement, 'transform', styleStr);
    //this.renderer.setStyle(this.el.nativeElement, 'border',  '1px solid magenta');
    this.renderer.setStyle(this.el.nativeElement, 'perspective', '1000px');
    this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
  }

  ngOnInit() {
    this.mousemoveSub = fromEvent<MouseEvent>(window, 'mousemove').pipe(
      throttleTime(100),
      tap((event: MouseEvent) => this.mouseMove(event)),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.mousemoveSub?.unsubscribe();
  }
}
