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
}
