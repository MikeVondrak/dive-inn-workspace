import { Component, ChangeDetectionStrategy, EventEmitter, Input, OnInit, Output, TemplateRef, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { CarouselPaneGradientTypes, CarouselPaneFaceDirections, CarouselPaneViewModes } from '../../../models/carousel.model';

@Component({
  selector: 'app-carousel-pane',
  templateUrl: './carousel-pane.component.html',
  styleUrls: ['./carousel-pane.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselPaneComponent implements OnInit {

  // @TODO: figure out type for Event
  @Output() onSwipe = new EventEmitter<any>();

  @Input() viewMode: CarouselPaneViewModes = CarouselPaneViewModes.NORMAL;
  @Input() gradient: CarouselPaneGradientTypes = CarouselPaneGradientTypes.NONE;
  @Input() faceDirection: CarouselPaneFaceDirections = CarouselPaneFaceDirections.S;
  @Input() faceLabel: string = '';
  @Input() faceTemplate: TemplateRef<any> | null = null;

  @Input() @HostBinding('style.--backgroundImage') backgroundImage: string = '';

  public carouselPaneGradientTypes = CarouselPaneGradientTypes;
  public carouselPaneFaceDirections = CarouselPaneFaceDirections;
  public carouselPaneViewModes = CarouselPaneViewModes;

  public debugging = true;

  constructor() { }

  ngOnInit(): void {
  }

  public handleOnSwipe(event: any) {
    console.log('SWIPE IN PANE');
    // this.onSwipe.emit(event);
  }
}
