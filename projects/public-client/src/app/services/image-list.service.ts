import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageListService {

  public images$: ReplaySubject<string[]> = new ReplaySubject<string[]>();

  constructor() { }

  public displayImageList(imageList: string[]) {
    this.images$.next(imageList);
    // console.log('next', {imageList});
  }
}
