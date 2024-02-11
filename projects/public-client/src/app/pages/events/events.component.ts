import { Component, OnInit } from '@angular/core';

import { HeroBannerOrientationConfigs  } from '../../models/hero-banner.model';

import { eventsPageHeroBannerConfigs } from './events.hero-banner.config';
import { ImageListService } from '../../services/image-list.service';
import { BehaviorSubject, Observable, observable, of } from 'rxjs';
import { EventsApiService } from '../../services/events.api.service';

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
  public eventsImages$: Observable<string[] | null> = of(null);
  public fullscreen: boolean = false;

  constructor(private eventsService: EventsApiService) { }

  ngOnInit(): void {
    this.getEventsImages();
  }

  getEventsImages() {
    this.eventsImages$ = this.eventsService.getEvents10$();
  }

  onClick() {
    this.fullscreen = !this.fullscreen;
  }

}
