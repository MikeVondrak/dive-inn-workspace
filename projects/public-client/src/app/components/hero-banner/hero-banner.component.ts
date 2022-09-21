import { Component, HostBinding, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { BreakpointsEnum, Orientations, ViewportService } from '@dive-inn-lib';

import { HeroBannerConfig } from '../../models/hero-banner.model';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroBannerComponent implements OnInit, OnDestroy {

  @Input() orientationConfigs: Map<Orientations, Map<BreakpointsEnum, HeroBannerConfig>> = new Map();

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
  @HostBinding('style.--textSize') textSize: string = '';
  @HostBinding('style.--textPaddingTop') textPaddingTop: string = '';
  @HostBinding('style.--textPaddingBottom') textPaddingBottom: string = '';

  public bgSize: string | undefined = '';
  public bgPosition: string | undefined = '';
  
  private destroy$ = new Subject<void>();

  constructor(private viewportService: ViewportService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const bpEnum: BreakpointsEnum = this.viewportService.getCurrentBreakpointEnum();
    this.getConfigForBreakpoint(bpEnum, this.viewportService.getOrientation());

    this.viewportService.viewportState$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      const bp: BreakpointsEnum = this.viewportService.getCurrentBreakpointEnum();            
      const cfg = this.getConfigForBreakpoint(state.currentBreakpoint, state.orientation);
      console.log('---------', {cfg}, state.orientation, bp);
      if (cfg) {
        this.setPropsForBreakpoints(cfg);
      }
    });
  }

  private getConfigForBreakpoint(bp: BreakpointsEnum, or: Orientations): HeroBannerConfig | undefined {
    let checkBp: BreakpointsEnum = BreakpointsEnum.zero;
    // get the config for 'zero' bp which should always have every prop with a value (by convention)
    let c = this.orientationConfigs.get(or);
    let config: HeroBannerConfig | undefined = c?.get(checkBp);
    let allBpChecked = false;
    
    while (!!config && checkBp !== bp && allBpChecked === false) {
      checkBp = this.viewportService.getBpEnumUp(checkBp);
      const configForBp = this.orientationConfigs.get(or)?.get(checkBp); 
      if (!!configForBp) {
        config = { ...config, ...configForBp };
      }      
      if (checkBp === BreakpointsEnum.hd) {
        allBpChecked = true;
      }
    }
    return config;
  }

  private setPropsForBreakpoints(bpConfig: HeroBannerConfig | undefined) {
    this.textTop = bpConfig?.textTop || '';
    this.textLeft = bpConfig?.textLeft || '';
    this.textContainerTransform = bpConfig?.textContainerTransform || '';
    this.textTransform = bpConfig?.textTransform || '';
    this.textAlign = bpConfig?.textAlign || '';
    this.bgSize = bpConfig?.bgSize || '';
    this.bgPosition = bpConfig?.bgPosition || '';
    this.textWidth = bpConfig?.textWidth || '';
    this.textSize = bpConfig?.textSize || '';
    this.textPaddingTop = bpConfig?.textPaddingTop || '';
    this.textPaddingBottom = bpConfig?.textPaddingBottom || '';
 
    console.log('+++++ SETTING!!', {bpConfig}, this.textPaddingTop);

    this.cdr.markForCheck();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
