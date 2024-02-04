import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild, ElementRef, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageListService } from '../../services/image-list.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-image-flip',
  templateUrl: './image-flip.component.html',
  styleUrls: ['./image-flip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFlipComponent implements OnInit, OnChanges {
  @ViewChild('ImageFlipContainer') imageFlipContainer!: ElementRef;
  
  @Input() images$: Observable<string[] | null> = of([]);
  @Input() title: string = "";

  public imageCount: number = 0;
  public centeredImage: number = 0;
  public loading: boolean = false;
  public loaded: boolean = false;
  public imagesStored: string[] = [];
  
  @HostBinding('style.--imageOffsetSmall') imageOffsetSmall: string = '10%';
  @HostBinding('style.--imageOffsetLarge') imageOffsetLarge: string = '0%';

  constructor(private cdr: ChangeDetectorRef, private imageListService: ImageListService) { }

  ngOnInit(): void {
    this.loading = true;
    this.images$.subscribe(images => {
      if (images) { 
        this.loading = false;
        this.loaded = true;
        this.imageCount = images.length;
        this.imagesStored = images;
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
    if (direction === 'L' && this.centeredImage < (this.imageCount - 1)) {
      this.centeredImage++;
      this.imageOffsetLarge = '-' + String(this.centeredImage * 102) + '%';
      this.imageOffsetSmall = '-' + String(this.centeredImage * 95.8) + '%';
    } else if (direction === 'R' && this.centeredImage > 0) {
      this.centeredImage--;
      this.imageOffsetLarge = '-' + String(this.centeredImage * 102) + '%';
      this.imageOffsetSmall = '-' + String(this.centeredImage * 95.8) + '%';
    }
  }

  onClick($event: any, index?: number) {
    this.imageListService.displayImageList(this.imagesStored, this.centeredImage);
  }
}
