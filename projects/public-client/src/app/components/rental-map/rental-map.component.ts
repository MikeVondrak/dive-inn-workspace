import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { rentalMapAnimations } from '../../animations/rental-map.animations';
import { RentalSpaces } from '../../models/rental-map.model';

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

  public zoomed: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleZoom($event: Event, space: RentalSpaces | null) {
    $event.stopPropagation();
    $event.preventDefault();
    if (space) {
      const zoomed = this.zooms.get(space);
      console.log('ZOOM', zoomed);
      this.zooms.set(space, !zoomed);
    } else {
      this.zooms.forEach((val, key, map) => {
        map.set(key, false);
      });
    }
    this.zoomed = Array.from(this.zooms.values()).includes(true);
  }
}
