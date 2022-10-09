import { Component, Input, OnInit } from '@angular/core';

import { ExpandingMenuLink, ExpandingMenuLinkGroup } from '../../models/expanding-menu.model';
@Component({
  selector: 'app-expanding-menu',
  templateUrl: './expanding-menu.component.html',
  styleUrls: ['./expanding-menu.component.scss']
})
export class ExpandingMenuComponent<ExpandingMenuHeaderEnum> implements OnInit {

  @Input() menuItems: ExpandingMenuLinkGroup[] = [];

  public isExpanded: boolean = false;
  public selectedGroup: string = 'Main';

  constructor() { }

  ngOnInit(): void {
  }

  public onClick(item: ExpandingMenuLinkGroup) {
    this.selectedGroup = item.title;
  }
}
