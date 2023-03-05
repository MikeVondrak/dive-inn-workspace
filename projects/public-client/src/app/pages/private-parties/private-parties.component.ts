import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, map } from 'rxjs';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { RentalSpaces } from '../../models/rental-map.model';
import { privatePartiesPageHeroBannerConfigs } from '../private-parties/private-parties.hero-banner.config';
import { rentalMapAnimations } from '../../animations/rental-map.animations';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-private-parties',
  templateUrl: './private-parties.component.html',
  styleUrls: ['./private-parties.component.scss'],
  animations: [rentalMapAnimations]
})
export class PrivatePartiesComponent implements OnInit {

  public heroBannerConfigs: HeroBannerOrientationConfigs = privatePartiesPageHeroBannerConfigs;
  public heroBannerTitleLines: string[] = [
    'Room Rentals',
    'Boat Bookings',
    'Private Parties',
    //'Custom Charters',
    //'Gala, Soiree, Shindig, Bash, Affair'
  ];
  public fullscreen: boolean = false;
  public zooms: Map<RentalSpaces, boolean> = new Map([
    [RentalSpaces.SPACE1, false],
    [RentalSpaces.SPACE2, false],
    [RentalSpaces.SPACE3, false],
    [RentalSpaces.SPACE4, false],
    [RentalSpaces.SPACE5, false],
    [RentalSpaces.SPACE6, false],
    [RentalSpaces.SPACE7, false],
  ]);
  public rentalSpaces = RentalSpaces;
  public zoomed: boolean = false;
  public buttonFadeState: string = 'unfaded';
  public overlayAnimationState: string = 'unfaded';
  public rentalMapAnimationState: string = 'unzoomed';
  
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
  ) {
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onClick() {
    this.fullscreen = !this.fullscreen;
  }

  public toggleZoom(event: Event, space: RentalSpaces | null, reset: boolean = false) {
    event.stopPropagation();
    event.preventDefault();

    if(!space && !reset) {
      return;
    }
    if (reset) {
      this.zooms.forEach((val, key, map) => map.set(key, false));
    } else if(!!space){
      this.zooms.set(space, true);
    }
    this.zoomed = Array.from(this.zooms.values()).includes(true);
    console.log('ZOOM', this.zoomed);
  }

  public buttonAnimationDone(e: AnimationEvent) {
    console.log('BUTTON FADE', e.toState);
    if (e.toState !== 'unfaded') {
      this.rentalMapAnimationState = "zoomed";
    } else {
      this.rentalMapAnimationState = "unzoomed";
    }
  }

  public overlayAnimationDone(e: AnimationEvent) {
    // overlay is being hidden
    if (e.toState === null) {
      // set public var to trigger map zoom in
      console.log('OVERLAY DONE > ZOOM IN', e.toState);
    } else {
      // done with map zoom-in animation
      console.log('OVERLAY DONE', e.toState);
    }
  }

  public rentalMapAnimationDone(e: AnimationEvent) {
    console.log('MAP ZOOM DONE');
  }
}
