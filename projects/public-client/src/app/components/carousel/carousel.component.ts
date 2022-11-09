import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() cubeSize: number = 30;
  @Input() faceLabels: string[] = ['A', 'B', 'C', 'D', 'E'];
  public faces: Observable<string>[] = [];
  //public facePositions: 

  @HostBinding('style.--transform1') transform1: string = `translate3d(${-1.207 * this.cubeSize + 'vw'}, 0, 0) rotateY(-90deg)`;


  public rotate: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.faceLabels.length < 5) {

    } else {
      this.faces = this.faceLabels.map(f => of(f));
    }
  }

}
