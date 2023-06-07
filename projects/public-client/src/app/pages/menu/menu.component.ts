import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { cluckHeroBannerConfigs } from './cluck.hero-banner.config';
import { foodpageHeroBannerConfigs } from './menu.hero-banner.config';
import { CarouselData } from '../../models/carousel.model';

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
  public heroBannerConfigsChicken: HeroBannerOrientationConfigs = cluckHeroBannerConfigs;

  public MenuContentItemsEnum = MenuContentItems;
  public fullscreenMenu: boolean = false;
  public fullscreenSpecials: boolean = false;
  public carouselData: CarouselData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.carouselData = [
      {backgroundImage: '/assets/images/specials/TakiTakosTNT.jpg'},
      {backgroundImage: '/assets/images/tour/boat_diagonal2.jpg'}
    ]
  }

  public onClick(contentEnum: MenuContentItems) {
    switch(contentEnum) {
      case MenuContentItems.MENU: this.fullscreenMenu = !this.fullscreenMenu; break;
      case MenuContentItems.SPECIALS: this.fullscreenSpecials = !this.fullscreenSpecials; break;
      // case MenuContentItems.SPECIALS: this.fullscreenSpecials = true; break;
    }
  }
}
