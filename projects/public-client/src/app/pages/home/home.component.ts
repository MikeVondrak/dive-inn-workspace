import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { HeroBannerOrientationConfigs  } from '../../models/hero-banner.model';

import { homepageHeroBannerConfigs } from './home.hero-banner.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  public heroBannerConfigs: HeroBannerOrientationConfigs = homepageHeroBannerConfigs;

  constructor() { }

  ngOnInit(): void {
  }


}
