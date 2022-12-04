import { Component, OnInit } from '@angular/core';

import { HeroBannerOrientationConfigs  } from '../../models/hero-banner.model';

import { eventsPageHeroBannerConfigs } from './events.hero-banner.config';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public heroBannerConfigs: HeroBannerOrientationConfigs = eventsPageHeroBannerConfigs;
  public heroBannerTitleLines: string[] = [
    //'Local Music',
    //'Live Sports',
    //'& Specials',
    //'Themes',
    //'Parties',
    //'Bashes',
    //'Blowouts',
    //'Festivities',
    //'Fiestas',
    //'Holidays',
    //'Celebrations',
    //'Competitions',
    //'Games',
    //'Prizes',
    //'Giveaways',
    //'Challenges',
  ];
  public fullscreen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.fullscreen = !this.fullscreen;
  }

}
