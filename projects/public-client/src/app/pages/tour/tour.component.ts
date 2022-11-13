import { Component, OnInit } from '@angular/core';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { tourHeroBannerConfigs } from './tour.hero-banner.config';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {

  public heroBannerConfigs: HeroBannerOrientationConfigs = tourHeroBannerConfigs;
  heroBannerTitleLines: string[] = ['Take a Tour'];

  constructor() { }

  ngOnInit(): void {
  }

}
