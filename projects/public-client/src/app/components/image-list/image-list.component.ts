import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageListService } from '../../services/image-list.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: ['./image-list.component.animations.ts']
})
export class ImageListComponent implements OnInit {
 
  public show: boolean = false;

  constructor(private imageListService: ImageListService, private cdr: ChangeDetectorRef) { 
  }
  
  ngOnInit(): void {
    this.imageListService.images$.asObservable().subscribe(imageList => {
      this.show = true;
      // console.log('list', this.show);
      this.cdr.detectChanges();
    });
  }

  public onOverlayClick() {
    this.show = false;
  }
}
