import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChildren, QueryList } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { RentalSpaceOverlayAnimationEvent, RentalSpaceOverlayPositionCss, RentalSpaces } from '../../../models/rental-map.model';
import { rentalMapAnimations } from '../../../animations/rental-map.animations';

@Component({
  selector: 'app-rental-space-overlay',
  templateUrl: './rental-space-overlay.component.html',
  styleUrls: ['./rental-space-overlay.component.scss'],
  animations: [rentalMapAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RentalSpaceOverlayComponent implements OnInit {

  @Input() title: string = '';
  @Input() positionCss: RentalSpaceOverlayPositionCss = { info: [], aside: [] };
  @Input() overlayId: RentalSpaces = RentalSpaces.DEFAULT;
  @Input() animationState: RentalSpaces = RentalSpaces.DEFAULT;
  @Input() imageUrls: string[] = [];
  @Input() capacity: [number, number] | null = [0,0];

  @Output() animationDone: EventEmitter<RentalSpaceOverlayAnimationEvent> 
    = new EventEmitter<RentalSpaceOverlayAnimationEvent>();

  @HostBinding('style.--infoTop') cssInfoTop: string = '';
  @HostBinding('style.--infoRight') cssInfoRight: string = '';
  @HostBinding('style.--infoBottom') cssInfoBottom: string = '';
  @HostBinding('style.--infoLeft') cssInfoLeft: string = '';

  @HostBinding('style.--asideTop') cssAsideTop: string = '';
  @HostBinding('style.--asideRight') cssAsideRight: string = '';
  @HostBinding('style.--asideBottom') cssAsideBottom: string = '';
  @HostBinding('style.--asideLeft') cssAsideLeft: string = '';

  // @ViewChildren('InfoContainer') 
  // private infoContainers!: QueryList<ElementRef>;
  
  constructor() { }
  
  ngOnInit(): void {
    // TODO: improve this
    this.cssInfoTop = this.positionCss.info[0];
    this.cssInfoRight = this.positionCss.info[1];
    this.cssInfoBottom = this.positionCss.info[2];
    this.cssInfoLeft = this.positionCss.info[3];
    this.cssAsideTop = this.positionCss.aside[0];
    this.cssAsideRight = this.positionCss.aside[1];
    this.cssAsideBottom = this.positionCss.aside[2];
    this.cssAsideLeft = this.positionCss.aside[3];
  }
  
  ngAfterViewInit() {
  }
  
  public onAnimationDone(event: AnimationEvent) {
    this.animationDone.emit({ event, overlayId: this.overlayId });
  }
  
}
