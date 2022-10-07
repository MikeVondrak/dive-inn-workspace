import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expanding-menu',
  templateUrl: './expanding-menu.component.html',
  styleUrls: ['./expanding-menu.component.scss']
})
export class ExpandingMenuComponent implements OnInit {

  @Input() headers: string[] = [];
  @Input() links: any[][] = [[{uiLabel: '', linkUrl: '', fragment: ''}]];
  //@Input() links2: any[] = [{uiLabel: '', linkUrl: '', fragment: ''}];
  //@Input() links3: any[] = [{uiLabel: '', linkUrl: '', fragment: ''}];

  public isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
