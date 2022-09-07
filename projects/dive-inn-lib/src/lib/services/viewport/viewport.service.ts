// https://brianflove.com/2018-01-11/angular-window-provider/
// https://stackblitz.com/edit/angular-7-breakpoint-observer?file=src%2Fservices%2Fbreakpoint-observer.service.ts

import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, min, shareReplay, startWith } from 'rxjs/operators';

import { Breakpoints, Orientations, ViewportState } from '../../models/viewport.model';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  // @TODO - how to connect SCSS breakpoint values to these?
  private readonly breakpoints: Map<Breakpoints, string> = new Map([
    ['zero', '(min-width: 0px)'],
    ['min', '(min-width: 320px)'],
    ['xs', '(min-width: 440px)'],
    ['sm', '(min-width: 600px)'],
    ['md', '(min-width: 840px)'],
    ['lg', '(min-width: 1024px)'],
    ['xl', '(min-width: 1280px)'],
    ['ws', '(min-width: 1440px)'],
    ['hd', '(min-width: 1920px)'],
  ]);

  private _viewportState$: BehaviorSubject<ViewportState> = new BehaviorSubject<ViewportState>(
    { 
      previousBreakpoint: 'zero', 
      currentBreakpoint: 'zero',
      orientation: Orientations.LANDSCAPE,
    });
  private _viewportState: ViewportState;

  public window: Window | null;
  public viewportState$: Observable<ViewportState>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
    this._viewportState = {
      previousBreakpoint: this.getCurrentBreakpoint(),
      currentBreakpoint: this.getCurrentBreakpoint(),
      orientation: this.getOrientation(),
    };

    this.viewportState$ = fromEvent(window, 'resize').pipe(
      debounceTime(100),
      map((event: Event) => {
        return this.getUpdatedViewportState();
      }),
      startWith(this.getUpdatedViewportState()),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  private getUpdatedViewportState(): ViewportState {
    const currentState: ViewportState = {
      previousBreakpoint: this._viewportState.currentBreakpoint,
      currentBreakpoint: this.getCurrentBreakpoint(),
      orientation: this.getOrientation(),
    };
    this._viewportState = currentState;
    return currentState;
  }

  public getCurrentBreakpoint(): Breakpoints {
    // @TODO - what is / how does this syntax work?
    // const [[newSize = 'zero']] = Array.from(this.breakpoints.entries())
    //   .filter(([size, mediaQuery]) => window.matchMedia(mediaQuery).matches);
    //   debugger;
    // return newSize;

    const bpMatches = Array.from(this.breakpoints.entries())
      .filter(bp => { const match = this.window?.matchMedia(bp[1]); /*console.log(bp[1], match);*/ return match?.matches; })
      .map(bpQuery => bpQuery[0]);
    const bpMax = bpMatches[bpMatches.length - 1];
    return bpMax;
  }

  public getOrientation(): Orientations {
    return (this.window?.innerHeight || 0) < (this.window?.innerWidth || 0) ? Orientations.LANDSCAPE : Orientations.PORTRAIT;
  }

  public getBpDown(bp: Breakpoints) {
    switch(bp) {
      case 'zero': return 'zero'; break;
      case 'min': return 'zero'; break;
      case 'xs': return 'min'; break;
      case 'sm': return 'xs'; break;
      case 'md': return 'sm'; break;
      case 'lg': return 'md'; break;
      case 'xl': return 'lg'; break;
      case 'ws': return 'xl'; break;
      case 'hd': return 'ws'; break;
    }
  }

  public getBpUp(bp: Breakpoints) {
    switch(bp) {
      case 'zero': return 'min'; break;
      case 'min': return 'xs'; break;
      case 'xs': return 'sm'; break;
      case 'sm': return 'md'; break;
      case 'md': return 'lg'; break;
      case 'lg': return 'xl'; break;
      case 'xl': return 'ws'; break;
      case 'ws': return 'hd'; break;
      case 'hd': return 'hd'; break;
    }
  }
}
