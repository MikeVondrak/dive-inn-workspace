import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { constructionPageHeroBannerConfigs } from './construction.hero-banner.config';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit {

  public heroBannerConfigs: HeroBannerOrientationConfigs = constructionPageHeroBannerConfigs;
  public heroBannerTitleLines: string[] = [
    //'Under',
    //'CONSTRUCTION'
  ];
  public fullscreen: boolean = false;
  public pageTitle$: Observable<string | null>;

  constructor(private activatedRoute: ActivatedRoute) { 
    this.pageTitle$ = this.activatedRoute.fragment.pipe(filter(frag => !!frag));
  }

  ngOnInit(): void {
  }

  public onClick() {
    this.fullscreen = !this.fullscreen;
  }
}
