import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-flip',
  templateUrl: './image-flip.component.html',
  styleUrls: ['./image-flip.component.scss']
})
export class ImageFlipComponent implements OnInit {
  @Input() images: string[] = [];

  public activeImage: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public onSwipe($event: Event, direction?: string) {
    console.log('swipe', {$event}, {direction});
    // $event.preventDefault();
    
    if (direction === 'L') {
      // this.imageLeft();
    } else if (direction === 'R') {
      // this.imageRight();
    }
  }

}
