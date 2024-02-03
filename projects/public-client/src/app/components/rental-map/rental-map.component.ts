import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { rentalMapAnimations } from '../../animations/rental-map.animations';
import { OpacityAnimationStates, RentalSpaces } from '../../models/rental-map.model';
import { RentalSpaceOverlayAnimationEvent } from '../../models/rental-map.model';

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
  rentalSpaceNames: string[] = ['The Oasis','The Boat','The Galley','The Cabin','The Deck','The Saloon','The Cabana'];
  
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
  public RentalSpaces = RentalSpaces;
  public OpacityAnimationStates = OpacityAnimationStates;

  public rentalSpaceList: RentalSpaces[] = [
    RentalSpaces.SPACE1,
    RentalSpaces.SPACE2,
    RentalSpaces.SPACE3,
    RentalSpaces.SPACE4,
    RentalSpaces.SPACE5,
    RentalSpaces.SPACE6,
    RentalSpaces.SPACE7,
  ];

  public mapMarkerAnimation: OpacityAnimationStates = OpacityAnimationStates.SHOWING;
  public mapAnimation: RentalSpaces = RentalSpaces.DEFAULT;
  public overlayAnimation: RentalSpaces = RentalSpaces.DEFAULT;
  public nextSpace: RentalSpaces = RentalSpaces.DEFAULT;
  public zoomed: boolean = false;
  public markersDisabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  public toggleZoom($event: Event, space: RentalSpaces | null) {
    if (this.markersDisabled) {
      return;
    }

    // prevent multiple triggers of a single click
    $event.stopPropagation();
    $event.preventDefault();

    // if calling with a space defined we are zooming into that space
    if (space && !this.zoomed) {

      // attempt to reorder the array so marker that was clicked would animate out last
      // @TODO - doesn't work
      // const el = this.rentalSpaceList.find(sp => sp === space);
      // if (el) {
      //   this.rentalSpaceList = this.rentalSpaceList.filter(sp => sp !== space);
      //   this.rentalSpaceList.push(el);
      // }

      // prevent multiple clicks
      this.markersDisabled = true;

      this.zooms.set(space, true);
      this.nextSpace = space;      
      this.mapMarkerAnimation = OpacityAnimationStates.HIDDEN;
    } else if (!space && this.zoomed) {
      // if calling with null we are zooming out, reset all zooms to false
      this.zooms.forEach((val, key, map) => {
        map.set(key, false);
      });
      this.nextSpace = RentalSpaces.DEFAULT;
      this.overlayAnimation = this.nextSpace; // start animation chain
    }
    this.zoomed = Array.from(this.zooms.values()).includes(true);
  }

  public toggleRentalMapState() {

  }

  /**
   * Callback for map marker animation complete
   * @param $event AnimationEvent
   */
  public mapMarkerAnimationDone($event: AnimationEvent) {
    this.markersDisabled = false;

    // Check which direction animation is playing
    if ($event.toState === 'void') {
      // if hiding, set the map animation flag to change
      this.mapAnimation = this.nextSpace;
      this.cdr.detectChanges();
    } 
    // if showing the map markers, animation is finished
  }

  /**
   * Callback for map zoom animation complete
   * @param $event AnimationEvent
   */
  public mapAnimationDone($event: AnimationEvent) {
    // Check which direction animation is playing, if not returning to default then we're zooming in
    if ($event.toState !== RentalSpaces.DEFAULT) {
      // if zooming in, trigger the overlay appear animation
      this.overlayAnimation = this.nextSpace;
    } else {
      // if zooming out, trigger the map marker appear animation
      this.mapMarkerAnimation = OpacityAnimationStates.SHOWING;
    }
  }

  /**
   * Callback for map zoom animation complete
   * @param $event AnimationEvent
   */
  public overlayAnimationDone(input: RentalSpaceOverlayAnimationEvent) {
    // Check which direction animation is playing, if not returning to default then we're zooming in
    if (this.nextSpace === RentalSpaces.DEFAULT) {
      // if zooming out, trigger the map marker disappear animation
      this.mapAnimation = this.nextSpace;      
      this.cdr.detectChanges(); // must detect changes here or map animation won't trigger
    } else {
      // if zooming in, animation is finished
    }
  }

}
