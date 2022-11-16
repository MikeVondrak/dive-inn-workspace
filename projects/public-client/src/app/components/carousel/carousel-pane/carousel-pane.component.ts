import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-carousel-pane',
  templateUrl: './carousel-pane.component.html',
  styleUrls: ['./carousel-pane.component.scss']
})
export class CarouselPaneComponent implements OnInit {

  @Input() template: TemplateRef<any> | null = null;
  @Input() faceDirectionClass: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
