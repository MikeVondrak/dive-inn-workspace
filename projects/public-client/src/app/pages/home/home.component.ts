import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { HeroBannerOrientationConfigs  } from '../../models/hero-banner.model';
import { IconCardConfig, IconCardImages, IconCardTextSizes } from '../../models/icon-card.model';

import { homepageHeroBannerConfigs } from './home.hero-banner.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  public heroBannerTitleLines: string[] = [
    'Local Events',
    'Live Sports',
    '& Games',
  ];
  public heroBannerConfigs: HeroBannerOrientationConfigs = homepageHeroBannerConfigs;

  public footerAddress: string[] = ['1380 S Broadway', 'Denver 80210'];
  public footerPhone: string = '720-242-6157';
  public contactHours: string[] = ['Open EVERY Day', '11AM - 2AM'];
  public contactSectionConfig: IconCardConfig[] = [
    {
      iconCardImage: IconCardImages.MAP_MARKER,
      textLines: [
        {
          uiLabel: this.footerAddress[0], 
          size: IconCardTextSizes.LARGE,
        },
        {
          uiLabel: this.footerAddress[1], 
          size: IconCardTextSizes.SMALL,
        },
      ]
    },
    {
      iconCardImage: IconCardImages.CLOCK, 
      textLines: [
        {
          uiLabel: this.contactHours[0], 
          size: IconCardTextSizes.SMALL,
        },
        {
          uiLabel: this.contactHours[1], 
          size: IconCardTextSizes.LARGE,
        },
      ]
    },
    {
      iconCardImage: IconCardImages.AT_SIGN, 
      textLines: [
        {
          uiLabel: this.footerPhone, 
          size: IconCardTextSizes.LARGE,
        },
        {
          uiLabel: 'contact@diveinndenver', 
          size: IconCardTextSizes.SMALL,
        },
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
