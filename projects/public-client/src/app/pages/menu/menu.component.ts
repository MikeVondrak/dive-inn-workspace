import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { foodpageHeroBannerConfigs } from './menu.hero-banner.config';

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

  constructor() { }

  ngOnInit(): void {
  }

}
