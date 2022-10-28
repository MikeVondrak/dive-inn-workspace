import { Location } from '@angular/common'
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { HeroBannerOrientationConfigs } from '../../models/hero-banner.model';
import { constructionPageHeroBannerConfigs } from './construction.hero-banner.config';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructionComponent implements OnInit, OnDestroy {

  public heroBannerConfigs: HeroBannerOrientationConfigs = constructionPageHeroBannerConfigs;
  public heroBannerTitleLines: string[] = [
    //'Under',
    //'CONSTRUCTION'
  ];
  public fullscreen: boolean = false;
  public pageTitle$: Observable<string | null>;
  
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location, 
    private cdr: ChangeDetectorRef
  ) {
    // this.pageTitle$ = this.activatedRoute.data.pipe(
    //   withLatestFrom(this.activatedRoute.fragment),
    this.pageTitle$ = combineLatest([
      this.activatedRoute.data,
      this.activatedRoute.fragment,
    ]).pipe(
      takeUntil(this.destroy$),
      //filter(frag => !!frag),
      map(([data, frag]) => {
        const state = this.location.getState() as any;
        console.log('++++++++++', state, data, frag);
        this.cdr.markForCheck();
        return state['pageTitle'];
      })
    );
  }

  ngOnInit(): void {
    //this.pageTitle$ = this.activatedRoute.fragment.pipe(filter(frag => !!frag));    
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public onClick() {
    this.fullscreen = !this.fullscreen;
  }
}
