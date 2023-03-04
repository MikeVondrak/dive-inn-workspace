import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, map } from 'rxjs';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { RentalSpaces } from '../../models/rental-map.model';
import { privatePartiesPageHeroBannerConfigs } from '../private-parties/private-parties.hero-banner.config';

@Component({
  selector: 'app-private-parties',
  templateUrl: './private-parties.component.html',
  styleUrls: ['./private-parties.component.scss'],
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
  public zoom1: boolean = false;
  
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

  public toggleZoom(space: RentalSpaces) {
    const zoomed = this.zooms.get(space);
    console.log('ZOOM', zoomed);
    this.zooms.set(space, !zoomed);
    this.zoom1 = !this.zoom1;
  }
}
