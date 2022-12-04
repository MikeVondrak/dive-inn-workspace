import { Component, OnInit } from '@angular/core';
import { ViewportService } from '@dive-inn-lib';
import { map } from 'rxjs';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { findUsPageHeroBannerConfigs } from './find-us.hero-banner.config';

@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.scss']
})
export class FindUsComponent implements OnInit {

  public heroBannerConfigs: HeroBannerOrientationConfigs = findUsPageHeroBannerConfigs;
  public heroBannerTitleLines: string[] = [
    '1380 S',
    'Broadway',
    'Denver CO 80210',
  ];

  public fullscreen: boolean = false;

  public mapCenter: google.maps.LatLngLiteral = {
    lat: 39.69160123918867, 
    lng: -104.98708204374248,
  };
  public mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoom: 14,
  };

  public mapMarkerPosition: google.maps.LatLngLiteral = this.mapCenter;
  public mapMarkerTitle = 'South Broadway and Arkansas Ave';
  public mapMarkerOptions: google.maps.MarkerOptions = {}


  // @TODO how to tie this to CSS dimensions?
  public cardDimensions$ = this.viewportService.viewportState$.pipe(
    map(viewportState => {      
      switch(viewportState.currentBreakpoint) {
        case 'zero': // fall through 
        case 'min': this.cardWidth = '100%'; this.cardHeight = '100%'; break;//this.cardWidth = '86vw'; this.cardHeight = '11vw'; break;
        // case 'xs':  //this.cardWidth = '80vw'; this.cardHeight = '16vw'; break;//this.cardWidth = '66vw'; this.cardHeight = '11vw'; break;
        // case 'sm':
        // case 'md': this.cardWidth = '60vw'; this.cardHeight = '40vw'; break;//this.cardWidth = '25.5vw'; this.cardHeight = '17vw'; break;
        // case 'lg':
        // case 'xl':
        // case 'ws':
        // case 'hd': //this.cardWidth = '24vw'; this.cardHeight = '18vw'; break;
        default: this.cardWidth = '100%'; this.cardHeight = '100%';
      };
      return { width: this.cardWidth, height: this.cardHeight };
    })
  );

  private cardWidth = '22vw';
  private cardHeight = '15vw';

  constructor(public viewportService: ViewportService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.fullscreen = !this.fullscreen;
  }

  public mapClick(event: MouseEvent) {
    event.stopPropagation(); // allow clicking on map w/o flipping card
  }
}
