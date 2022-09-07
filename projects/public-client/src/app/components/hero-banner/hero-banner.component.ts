import { Component, HostBinding, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Breakpoints, Orientations, ViewportService } from '@dive-inn-lib';

import { HeroBannerConfig } from '../../models/hero-banner.model';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent implements OnInit, OnDestroy {

  @Input() orientationConfigs: Map<Orientations, Map<Breakpoints, HeroBannerConfig>> = new Map();

  @Input() imgSrc: string = '';
  @Input() textLines: string[] = [];

  @HostBinding('style.--width') width: string = '';
  @HostBinding('style.--height') height: string = '';
  @HostBinding('style.--textWidth') textWidth: string = '';;
  @HostBinding('style.--textTop') textTop: string = '';
  @HostBinding('style.--textLeft') textLeft: string = '';
  @HostBinding('style.--textContainerTransform') textContainerTransform: string = '';
  @HostBinding('style.--textTransform') textTransform: string = '';
  @HostBinding('style.--textAlign') textAlign: string = '';

  public bgSize: string | undefined = '';
  public bgPosition: string | undefined = '';
  
  private destroy$ = new Subject<void>();

  constructor(private viewportService: ViewportService) { }

  ngOnInit(): void {
    this.getConfigForBreakpoint(this.viewportService.getCurrentBreakpoint(), this.viewportService.getOrientation());
    
    console.log('1!!!!!', this.bgSize, this.bgPosition, this.orientationConfigs);

    this.viewportService.viewportState$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      
      
      console.log('2!!!!!', this.bgSize, this.bgPosition, state, this.orientationConfigs);
      const cfg = this.getConfigForBreakpoint(state.currentBreakpoint, state.orientation);
      this.setPropsForBreakpoints(cfg);
    });
  }

  private getConfigForBreakpoint(bp: Breakpoints, or: Orientations): HeroBannerConfig | undefined {
    let checkBp: Breakpoints = 'zero';
    // get the config for 'zero' bp which should always have every prop with a value (by convention)
    let config: HeroBannerConfig | undefined = this.orientationConfigs.get(or)?.get(checkBp);
    
    while (checkBp !== bp) {
      checkBp = this.viewportService.getBpUp(checkBp);
      const configForBp = this.orientationConfigs.get(or)?.get(checkBp);
      if (!!configForBp) {
        config = { ...config, ...configForBp };
      }
      console.log('CONFIG FOR BP', configForBp);
    }
    return config;
  }

  private setPropsForBreakpoints(bpConfig: HeroBannerConfig | undefined) {
    // const bpConfig: HeroBannerConfig | undefined = this.orientationConfigs.get(state.orientation)?.get(state.currentBreakpoint);

    this.height = bpConfig?.height || '';
    this.width = bpConfig?.width || '';

    this.textWidth = bpConfig?.textWidth || '';
    this.textTop = bpConfig?.textTop || '';
    this.textLeft = bpConfig?.textLeft || '';
    this.textContainerTransform = bpConfig?.textContainerTransform || '';
    this.textTransform = bpConfig?.textTransform || '';
    this.textAlign = bpConfig?.textAlign || '';
    this.bgSize = bpConfig?.bgSize;
    this.bgPosition = bpConfig?.bgPosition;
    this.textWidth = bpConfig?.textWidth || '';
 
    console.log('+++++', {bpConfig});

  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
