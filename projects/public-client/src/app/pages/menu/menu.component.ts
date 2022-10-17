import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { foodpageHeroBannerConfigs } from './menu.hero-banner.config';

enum MenuContentItems {
  MENU = 'Menu',
  SPECIALS = 'Specials'
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {

  public heroBannerTitleLinesTaco: string[] = []; // ['Menu', '&', 'Specials'];
  public heroBannerConfigsTaco: HeroBannerOrientationConfigs = foodpageHeroBannerConfigs;
  public heroBannerTitleLinesChicken: string[] = []; //['Menu', '&', 'Specials'];
  public heroBannerConfigsChicken: HeroBannerOrientationConfigs = foodpageHeroBannerConfigs;

  public MenuContentItemsEnum = MenuContentItems;
  public fullscreenMenu: boolean = false;
  public fullscreenSpecials: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onClick(contentEnum: MenuContentItems) {
    console.log(contentEnum);
    switch(contentEnum) {
      case MenuContentItems.MENU: this.fullscreenMenu = !this.fullscreenMenu; break;
      case MenuContentItems.SPECIALS: this.fullscreenSpecials = !this.fullscreenSpecials; break;
    }
  }
}
