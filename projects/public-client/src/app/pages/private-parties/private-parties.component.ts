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
    'Room Rentals',
    'Boat Bookings',
    'Private Parties',
    //'Custom Charters',
    //'Gala, Soiree, Shindig, Bash, Affair'
  ];
  public fullscreen: boolean = false;

  // NOTE: whitespace matters for email body
  public mailto_pre: string = `mailto:contact@diveinndenver.com?subject=[Reservation Request]&body=
Organizer Name: %0D%0A
  Phone: %0D%0A
  Email: %0D%0A%0D%0A
Theme: %0D%0A%0D%0A
Birthday (yes / no): %0D%0A
  Name: %0D%0A
  Age: %0D%0A%0D%0A
Date: %0D%0A
Start Time: %0D%0A
End Time: %0D%0A%0D%0A
Headcount: %0D%0A%0D%0A
Spaces (Boat, Main Room, North Patio, North Room, Game Room, South Room, South Patio): %0D%0A`;
  public mailto_post: string = `%0D%0A%0D%0ANotes: `

  public mailto: string = this.mailto_pre + this.mailto_post;
  public mailto_boat: string = this.mailto_pre + `Boat` + this.mailto_post;
  public mailto_mainRoom: string = this.mailto_pre + `Main Room` + this.mailto_post;
  public mailto_sideRoom: string = this.mailto_pre + `South Room` + this.mailto_post;
  public mailto_gameRoom: string = this.mailto_pre + `Game Room` + this.mailto_post;
  public mailto_northRoom: string= this.mailto_pre + `North Room` + this.mailto_post;
  public mailto_northPatio: string= this.mailto_pre + `North Patio` + this.mailto_post;
  public mailto_southPatio: string = this.mailto_pre + `South Patio` + this.mailto_post;
  
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
