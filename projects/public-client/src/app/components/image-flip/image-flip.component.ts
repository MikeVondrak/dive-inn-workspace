import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-image-flip',
  templateUrl: './image-flip.component.html',
  styleUrls: ['./image-flip.component.scss']
})
export class ImageFlipComponent implements OnInit {
  @Input() images: string[] = [];

  public centeredImage: number = 0;
  
  @HostBinding('style.--imageOffsetSmall') imageOffsetSmall: string = '0%';
  @HostBinding('style.--imageOffsetLarge') imageOffsetLarge: string = '0%';

  constructor() { }

  ngOnInit(): void {
  }

  public onSwipe($event: Event, direction?: string) {
    const offsetLarge: number = 75;
    const offsetSmall: number = 88.25;
    
    if (direction === 'L' && this.centeredImage < (this.images.length - 1)) {
      this.centeredImage++;
      if (this.centeredImage === 1) {
        this.imageOffsetLarge = '-63%';
        this.imageOffsetSmall = '-81%';
      } else if (this.centeredImage === this.images.length - 1) {
        this.imageOffsetLarge =  '-' + String((this.centeredImage - 2) * offsetLarge + 126) + '%';
        this.imageOffsetSmall =  '-' + String((this.centeredImage - 2) * offsetSmall + 162) + '%';
      } else {
        this.imageOffsetLarge =  '-' + String((this.centeredImage - 1) * offsetLarge + 63) + '%';
        this.imageOffsetSmall =  '-' + String((this.centeredImage - 1) * offsetSmall + 81) + '%';
      }
    } else if (direction === 'R' && this.centeredImage > 0) {
      this.centeredImage--;
      if (this.centeredImage === this.images.length - 2) {
        this.imageOffsetLarge =  '-' + String((this.centeredImage - 1) * offsetLarge + 63) + '%';
        this.imageOffsetSmall =  '-' + String((this.centeredImage - 1) * offsetSmall + 81) + '%';
      } else if (this.centeredImage === 0) {
        this.imageOffsetLarge = '-0%';
        this.imageOffsetSmall = '-0%';
      } else {
        this.imageOffsetLarge =  '-' + String((this.centeredImage - 1) * offsetLarge + 63) + '%';
        this.imageOffsetSmall =  '-' + String((this.centeredImage - 1) * offsetSmall + 81) + '%';
      }
    }
  }

  onClick($event: Event, index: number) {
    if (index > this.centeredImage) {
      this.onSwipe($event, 'L');
    } else if (index < this.centeredImage) {
      this.onSwipe($event, 'R');
    }
  }
}