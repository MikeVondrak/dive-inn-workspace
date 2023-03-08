import { Component, ElementRef, AfterViewInit, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild('image') imageRef!: ElementRef;

  @Input() imageUrl: string = '';

  public width: number = 0;
  public height: number = 0;
  public isPortrait: boolean = false;
  
  public toBottom: boolean = false;

  private readonly aspectRatio = 4.0/3.0;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.width = this.imageRef.nativeElement.clientWidth;
      this.height = this.imageRef.nativeElement.clientHeight;
      this.isPortrait = (this.width / this.height) > this.aspectRatio;
    }, 0);
  }

  testPan() {
    this.toBottom = !this.toBottom;
  }

}
