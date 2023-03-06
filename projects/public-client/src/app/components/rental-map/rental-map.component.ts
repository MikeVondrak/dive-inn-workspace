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

  public nextSpace: RentalSpaces = RentalSpaces.DEFAULT;

  constructor() {}

  ngOnInit(): void {}

  public toggleZoom($event: Event, space: RentalSpaces | null) {
    console.log('toggleZoom', this.zoomed, space, this.mapAnimation);
    $event.stopPropagation();
    $event.preventDefault();

    if (space) {
      // if calling with a space defined we are zooming into that space
      this.zooms.set(space, true);
      const zoomed = this.zooms.get(space);
      this.nextSpace = space;
      console.log('ZOOMING', this.nextSpace, this.mapMarkerAnimation);
      this.mapMarkerAnimation = OpacityAnimationStates.HIDDEN;
    } else {
      // if calling with null we are zooming out, reset all zooms to false
      this.zooms.forEach((val, key, map) => {
        map.set(key, false);
      });
      this.nextSpace = RentalSpaces.DEFAULT;
      this.mapAnimation = this.nextSpace;
    }
    this.zoomed = Array.from(this.zooms.values()).includes(true);
    //this.mapAnimation = space || RentalSpaces.DEFAULT;    
    console.log('toggleZoom done', this.zoomed, this.mapAnimation, this.nextSpace);
  }

  public mapMarkerAnimationDone($event: AnimationEvent) {
    console.log('mapMarkerAnimationDone', $event.toState);
    // Check which direction animation is playing
    if ($event.toState === OpacityAnimationStates.HIDDEN) {
      // if hiding, set the map animation flag to change
      console.log('mapMarkerAnimationDone => HIDDEN', this.nextSpace);
      this.mapAnimation = this.nextSpace;
      //this.nextSpace = RentalSpaces.DEFAULT;
    } else {
      // if showing, animation is done now
    }
  }
  public mapAnimationDone($event: AnimationEvent) {
    console.log('mapAnimationDone', $event.toState);
    // Check which direction animation is playing, if not returning to default then we're zooming in
    if ($event.toState !== RentalSpaces.DEFAULT) {
      // if zooming in, set the overlay animation flag to change
      this.overlayAnimation = OpacityAnimationStates.SHOWING;
    } else {
      // if zooming out, --map marker animation is handled by :enter / :leave
      this.mapMarkerAnimation = OpacityAnimationStates.SHOWING;
    }
  }
}
