import { AfterViewInit, Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ImageListService {

  public images$: ReplaySubject<string[]> = new ReplaySubject<string[]>();

  private window: Window | null = null;
  private scrollPositionOnOpen: number = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {
    console.log('CONSTRUCT', this.document, this.document.defaultView)
    this.window = this.document?.defaultView;
  }

  public scrollToLastPosition() {
    console.log('SCROLL', this.scrollPositionOnOpen);
    if (this.scrollPositionOnOpen >= 0) {
      this.window?.scrollTo({ top: this.scrollPositionOnOpen, behavior: 'smooth' });
    }
  }

  public displayImageList(imageList: string[]) {
    this.images$.next(imageList);
    // console.log('next', {imageList});
    this.scrollPositionOnOpen = this.window?.scrollY || 1;
    
    console.log('IMAGE SERVICE', this.window, this.scrollPositionOnOpen);
  }
}
