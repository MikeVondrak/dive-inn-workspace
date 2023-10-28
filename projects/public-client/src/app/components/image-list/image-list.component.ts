import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Inject, HostBinding, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageListService } from '../../services/image-list.service';
import { imageListAnimations } from './image-list.component.animations';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [imageListAnimations]
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
      this.imageCount = imageList.length;
      this.imageListService.scrollToPosition(0);
      this.centeredImage = this.imageListService.imageStart;
      this.imageOffset = '-' + String(this.centeredImage * 100) + '%';
      this.cdr.detectChanges();
    });
  }

  public onOverlayClick($event: any) {
    this.centeredImage = 0;
    this.show = false;
    this.imageOffset = '0%';
    this.imageListService.scrollToLastPosition();
  }

  public onSwipe($event: Event, direction: string) {
    if (direction === 'L' && this.centeredImage < (this.imageCount - 1)) {
      this.centeredImage++;
      this.imageOffset = '-' + String(this.centeredImage * 100) + '%';
    } else if (direction === 'R' && this.centeredImage > 0) {
      this.centeredImage--;
      this.imageOffset = '-' + String(this.centeredImage * 100) + '%';
    }
  }
}
