import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Inject, HostBinding } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageListService } from '../../services/image-list.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: ['./image-list.component.animations.ts']
})
export class ImageListComponent implements AfterViewInit {
  @ViewChild('ImgList') imgListElement!: ElementRef;

  public show: boolean = false;
  public images: string[] = [];
  public imageCount: number = 0;
  public centeredImage: number = 0;

  @HostBinding('style.--imageOffset') imageOffset: string = '0%';

  constructor(private cdr: ChangeDetectorRef, private imageListService: ImageListService) { 
  }
  
  ngAfterViewInit(): void {
    this.imageListService.images$.asObservable().subscribe(imageList => {
      this.images = imageList;
      this.show = true;
      this.cdr.detectChanges();
    });
  }

  public onOverlayClick() {
    this.show = false;
    this.imageListService.scrollToLastPosition();
  }

  public onSwipe($event: Event, direction: string) {
    console.log('swipe');
    if (direction === 'L' && this.centeredImage < (this.imageCount - 1)) {
      this.centeredImage++;
      this.imageOffset = '-' + String(this.centeredImage * 100) + '%';
      // this.imageOffsetLarge = '-' + String(this.centeredImage * 102) + '%';
      // this.imageOffsetSmall = '-' + String(this.centeredImage * 95.8) + '%';
    } else if (direction === 'R' && this.centeredImage > 0) {
      this.centeredImage--;
      this.imageOffset = '-' + String(this.centeredImage * 100) + '%';
      // this.imageOffsetLarge = '-' + String(this.centeredImage * 102) + '%';
      // this.imageOffsetSmall = '-' + String(this.centeredImage * 95.8) + '%';
    }
  }
}
