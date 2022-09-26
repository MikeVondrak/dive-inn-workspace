import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ViewportService } from '@dive-inn-lib';
import { IconCardConfig } from '../../models/icon-card.model';

@Component({
  selector: 'app-contact-banner',
  templateUrl: './contact-banner.component.html',
  styleUrls: ['./contact-banner.component.scss']
})
export class ContactBannerComponent implements OnInit {

  @Input() config: IconCardConfig[] = [];

  // public mapCenter: google.maps.LatLngLiteral = {
  //   lat: 39.69160123918867, 
  //   lng: -104.98708204374248,
  // };
  // public mapOptions: google.maps.ImageMapTypeOptions = {};

  // public mapMarkerPosition: google.maps.LatLngLiteral = this.mapCenter;
  public mapMarkerTitle = 'South Broadway and Arkansas Ave';
  public mapMarkerOptions = {}

  // @TODO how to tie this to CSS dimensions?
  public cardDimensions$ = this.viewportService.viewportState$.pipe(
    map(viewportState => {      
      switch(viewportState.currentBreakpoint) {
        case 'zero': // fall through 
        case 'min': this.cardWidth = '90vw'; this.cardHeight = '14vw'; break;//this.cardWidth = '86vw'; this.cardHeight = '11vw'; break;
        case 'xs':  this.cardWidth = '70vw'; this.cardHeight = '16vw'; break;//this.cardWidth = '66vw'; this.cardHeight = '11vw'; break;
        case 'sm':
        case 'md': this.cardWidth = '28vw'; this.cardHeight = '21vw'; break;//this.cardWidth = '25.5vw'; this.cardHeight = '17vw'; break;
        case 'lg':
        case 'xl':
        case 'ws':
        case 'hd': this.cardWidth = '24vw'; this.cardHeight = '18vw'; break;
        default: this.cardWidth = '24vw'; this.cardHeight = '17vw';
      };
      return { width: this.cardWidth, height: this.cardHeight };
    })
  );

  private cardWidth = '22vw';
  private cardHeight = '15vw';

  constructor(public viewportService: ViewportService) { }

  ngOnInit(): void {
    
  }

  public mapClick(event: MouseEvent) {
    event.stopPropagation(); // allow clicking on map w/o flipping card
  }
}
