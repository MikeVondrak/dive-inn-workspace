import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-image-flip',
  templateUrl: './image-flip.component.html',
  styleUrls: ['./image-flip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFlipComponent implements OnInit, OnChanges {
  @Input() images$: Observable<string[] | null> = of([]);

  public imageCount: number = 0;
  public centeredImage: number = 0;
  public loading: boolean = false;
  public loaded: boolean = false;
  
  @HostBinding('style.--imageOffsetSmall') imageOffsetSmall: string = '0%';
  @HostBinding('style.--imageOffsetLarge') imageOffsetLarge: string = '0%';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loading = true;
    this.images$.subscribe(images => {
      if (images) { 
        this.loading = false;
        this.loaded = true;
        this.imageCount = images.length;
      };
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', {changes});
    // if (changes['images$']) {
    //   this.imageCount = changes['images$']?.currentValue?.length;
    //   //this.cdr.markForCheck();
    // }
  }

  public onSwipe($event: Event, direction?: string) {

    console.log('Swipe', direction, this.imageCount);

    const offsetLarge: number = 75;
    const offsetSmall: number = 88.25;
    
    if (direction === 'L' && this.centeredImage < (this.imageCount - 1)) {
      this.centeredImage++;
      if (this.centeredImage === 1) {
        this.imageOffsetLarge = '-63%';
        this.imageOffsetSmall = '-81%';
      } else if (this.centeredImage === this.imageCount - 1) {
        this.imageOffsetLarge =  '-' + String((this.centeredImage - 2) * offsetLarge + 126) + '%';
        this.imageOffsetSmall =  '-' + String((this.centeredImage - 2) * offsetSmall + 162) + '%';
      } else {
        this.imageOffsetLarge =  '-' + String((this.centeredImage - 1) * offsetLarge + 63) + '%';
        this.imageOffsetSmall =  '-' + String((this.centeredImage - 1) * offsetSmall + 81) + '%';
      }
    } else if (direction === 'R' && this.centeredImage > 0) {
      this.centeredImage--;
      if (this.centeredImage === this.imageCount - 2) {
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
    } else {
      console.log('click');
    }
  }
}
