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
    'Local Events',
    'Live Sports',
    '& Games',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
