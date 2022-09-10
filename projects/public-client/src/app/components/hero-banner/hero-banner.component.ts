import { Component, HostBinding, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Breakpoints, BreakpointsEnum, Orientations, ViewportService } from '@dive-inn-lib';

import { HeroBannerConfig } from '../../models/hero-banner.model';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
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

  public bgSize: string | undefined = '';
  public bgPosition: string | undefined = '';
  
  private destroy$ = new Subject<void>();

  constructor(private viewportService: ViewportService) { }

  ngOnInit(): void {
    const bpEnum: BreakpointsEnum = this.viewportService.getCurrentBreakpointEnum();

    this.getConfigForBreakpoint(bpEnum, this.viewportService.getOrientation());
    
    console.log('1!!!!!', this.bgSize, this.bgPosition, this.orientationConfigs);

    this.viewportService.viewportState$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      
      
      console.log('2!!!!!', this.bgSize, this.bgPosition, state);
      const cfg = this.getConfigForBreakpoint(bpEnum, state.orientation);
      this.setPropsForBreakpoints(cfg);
    });
  }

  private getConfigForBreakpoint(bp: BreakpointsEnum, or: Orientations): HeroBannerConfig | undefined {
    let checkBp: BreakpointsEnum = BreakpointsEnum.zero;
    // get the config for 'zero' bp which should always have every prop with a value (by convention)
    let c = this.orientationConfigs.get(or);
    let config: HeroBannerConfig | undefined = c?.get(checkBp);
    let allBpChecked = false;
    
    console.log('3++++', bp, or, config, c);

    while (!!config && checkBp !== bp && allBpChecked === false) {
      
      
      checkBp = this.viewportService.getBpEnumUp(checkBp);
      
      const configForBp = this.orientationConfigs.get(or)?.get(checkBp);
      


      
      
      
      if (!!configForBp) {
        config = { ...config, ...configForBp };
      }
      console.log('CONFIG FOR BP', checkBp, bp, configForBp);
      if (checkBp === BreakpointsEnum.hd) {
        allBpChecked = true;
      }
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
 
    console.log('+++++ SETTING!!', {bpConfig});

  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
