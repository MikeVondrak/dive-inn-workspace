import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { rentalMapAnimations } from '../../animations/rental-map.animations';
import { OpacityAnimationStates, RentalSpaces } from '../../models/rental-map.model';

@Component({
  selector: 'app-rental-map',
  templateUrl: './rental-map.component.html',
  styleUrls: ['./rental-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [rentalMapAnimations],
})
export class RentalMapComponent implements OnInit {
  @Input()
  @HostBinding('style.--mapWidth')
  mapWidth: string = '100%';
  
  @Input()
  @HostBinding('style.--mapHeight')
  mapHeight: string = '100%';

  public zooms: Map<RentalSpaces, boolean> = new Map([
    [RentalSpaces.LEGEND, false],
    [RentalSpaces.SPACE1, false],
    [RentalSpaces.SPACE2, false],
    [RentalSpaces.SPACE3, false],
    [RentalSpaces.SPACE4, false],
    [RentalSpaces.SPACE5, false],
    [RentalSpaces.SPACE6, false],
    [RentalSpaces.SPACE7, false],
  ]);
  public rentalSpaces = RentalSpaces;

  public overlayAnimation: OpacityAnimationStates = OpacityAnimationStates.HIDDEN;
  public mapAnimation: RentalSpaces = RentalSpaces.DEFAULT;
  public mapMarkerAnimation: OpacityAnimationStates = OpacityAnimationStates.SHOWING;

  public zoomed: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleZoom($event: Event, space: RentalSpaces | null) {
    $event.stopPropagation();
    $event.preventDefault();
    if (space) {
      const zoomed = this.zooms.get(space);
      this.zooms.set(space, !zoomed);
      console.log('ZOOM', zoomed);
    } else {
      this.zooms.forEach((val, key, map) => {
        map.set(key, false);
      });
    }
    this.zoomed = Array.from(this.zooms.values()).includes(true);
    this.mapAnimation = space || RentalSpaces.DEFAULT;
  }

  public mapMarkerAnimationDone($event: AnimationEvent) {
    console.log('mapMarkerAnimationDone', $event.toState);
    // Check which direction animation is playing
    if ($event.toState === OpacityAnimationStates.HIDDEN) {
      // if hiding, set the map animation flag to change
      this.mapAnimation = RentalSpaces.SPACE1;
    } else {
      // if showing, animation is done now
    }
  }
  public mapAnimationDone($event: AnimationEvent) {
    console.log('mapAnimationDone', $event.toState);
    // Check which direction animation is playing
    if ($event.toState === RentalSpaces.SPACE1) {
      // if zooming in, set the overlay animation flag to change
      this.overlayAnimation = OpacityAnimationStates.SHOWING;
    } else {
      // if zooming out, set the map marker animation flag
      this.mapMarkerAnimation = OpacityAnimationStates.SHOWING;
    }
  }
}
