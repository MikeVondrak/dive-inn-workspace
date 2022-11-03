import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, map } from 'rxjs';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { privatePartiesPageHeroBannerConfigs } from '../private-parties/private-parties.hero-banner.config';

@Component({
  selector: 'app-private-parties',
  templateUrl: './private-parties.component.html',
  styleUrls: ['./private-parties.component.scss']
})
export class PrivatePartiesComponent implements OnInit {

  public heroBannerConfigs: HeroBannerOrientationConfigs = privatePartiesPageHeroBannerConfigs;
  public heroBannerTitleLines: string[] = [
    'Boat Bookings',
    'Room Rentals',
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

  public onClick() {
    
  }

}
