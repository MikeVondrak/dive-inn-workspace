import { AfterViewInit, Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ImageListService {

  public images$: ReplaySubject<string[]> = new ReplaySubject<string[]>();
  public imageStart: number = 0;

  private window: Window | null = null;
  private scrollPositionOnOpen: number = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document?.defaultView;
  }

  public scrollToPosition(position: number) {
    this.window?.scrollTo({ top: position, behavior: 'smooth' });
  }
  public scrollToLastPosition() {
    if (this.scrollPositionOnOpen >= 0) {
      this.window?.scrollTo({ top: this.scrollPositionOnOpen, behavior: 'smooth' });
    }
  }

  public displayImageList(imageList: string[], centeredImage: number) {
    this.imageStart = centeredImage;
    this.images$.next(imageList);
    this.scrollPositionOnOpen = this.window?.scrollY || 1;
  }
}
