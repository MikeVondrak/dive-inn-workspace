import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CarouselPaneGradientTypes, CarouselPaneFaceDirections } from '../../../models/carousel.model';

@Component({
  selector: 'app-carousel-pane',
  templateUrl: './carousel-pane.component.html',
  styleUrls: ['./carousel-pane.component.scss']
})
export class CarouselPaneComponent implements OnInit {

  // @TODO: figure out type for Event
  @Output() onSwipe = new EventEmitter<any>();

  @Input() gradient: CarouselPaneGradientTypes = CarouselPaneGradientTypes.NONE;
  @Input() faceDirection: CarouselPaneFaceDirections = CarouselPaneFaceDirections.S;
  @Input() face$: Observable<string> = new Observable;

  public carouselPaneGradientTypes = CarouselPaneGradientTypes;
  public carouselPaneFaceDirections = CarouselPaneFaceDirections;

  public debugging = false;

  constructor() { }

  ngOnInit(): void {
  }

  public handleOnSwipe(event: any) {
    this.onSwipe.emit(event);
  }
}
