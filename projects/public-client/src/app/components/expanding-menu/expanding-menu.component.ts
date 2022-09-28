import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expanding-menu',
  templateUrl: './expanding-menu.component.html',
  styleUrls: ['./expanding-menu.component.scss']
})
export class ExpandingMenuComponent implements OnInit {

  @Input() links: any[] = [{uiLabel: '', linkUrl: '', fragment: ''}];

  public isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
