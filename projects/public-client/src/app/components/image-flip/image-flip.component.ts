import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-image-flip',
  templateUrl: './image-flip.component.html',
  styleUrls: ['./image-flip.component.scss']
})
export class ImageFlipComponent implements OnInit {
  @Input() images: string[] = [];

  // public centeredImage: number = 0;
  
  @HostBinding('style.--centeredImage') centeredImage: number = 0;
  @HostBinding('style.--imageOffset') imageOffset: string = '0%';
  @HostBinding('style.--offsetTweak') offsetTweak: string = '0%';

  constructor() { }

  ngOnInit(): void {
    this.offsetTweak = '-' + String(40 / (this.images.length - 1)) + '%'
  }

  public onSwipe($event: Event, direction?: string) {
    console.log('swipe', {$event}, {direction});
    const offset: number = 125 / (this.images.length - 1);
    // translate % is based off of the image-flip-container width, not images-container width
    // $event.preventDefault();
    
    if (direction === 'L' && this.centeredImage < (this.images.length - 1)) {
      // this.imageLeft();
      this.centeredImage++;
      this.imageOffset = this.centeredImage === this.images.length ? '-125%' : '-' + String((this.centeredImage) * offset) + '%';
      console.log(this.imageOffset)
    } else if (direction === 'R' && this.centeredImage > 0) {
      // this.imageRight();
      this.centeredImage--;
      this.imageOffset = this.centeredImage ===  0 ? '0%': '-' + String((this.centeredImage) * offset) + '%';
    }
  }

}
