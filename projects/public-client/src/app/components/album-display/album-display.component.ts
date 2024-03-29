import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { AlbumDisplayImagePosition } from '../../models/album-display.model';

@Component({
  selector: 'app-album-display',
  templateUrl: './album-display.component.html',
  styleUrls: ['./album-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumDisplayComponent implements OnInit {
  @Input() showInfo: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrls: string[] = [];

  public inFrame = false;
  public activeImage = 0;

  private readonly imgTransitionTime = 5000;

  private imgTimer$: Observable<number> = timer(this.imgTransitionTime, this.imgTransitionTime);
  private pauseTimer$: Observable<number> = timer(this.imgTransitionTime, this.imgTransitionTime);
  private killImgTimer$ = new Subject<void>();
  private timerSub: Subscription = new Subscription;
 
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // TODO set up unsubscribe
    this.timerSub = this.subscribeToImageTimer();
  }

  public stopEvent($event: Event) {
    $event.stopPropagation();
    $event.preventDefault();
  }

  public prevClicked($event: Event) {
    // $event.stopPropagation();
    // $event.preventDefault();
    this.userInteracted();
    this.decrementActiveImage();
  }

  public nextClicked($event: Event) {
    // $event.stopPropagation();
    // $event.preventDefault();
    this.userInteracted();
    this.incrementActiveImage();
  }

  public pillClicked($event: Event, idx: number) {
    // $event.stopPropagation();
    // $event.preventDefault();
    this.userInteracted();
    this.activeImage = idx;
    this.cdr.detectChanges();
  }

  public onImageClick($event: Event) {
    this.userInteracted();
    // $event.stopPropagation();
    // $event.preventDefault();
  }

  private userInteracted() {
    this.killImgTimer$.next();

    this.pauseTimer$.pipe(take(1), takeUntil(this.killImgTimer$)).subscribe(tick => {
      this.subscribeToImageTimer();
    })
  }

  private incrementActiveImage() {
    if (this.activeImage < this.imageUrls.length - 1) {
      this.activeImage++;
    } else {
      this.activeImage = 0;
    }
    this.cdr.detectChanges();
  }
  private decrementActiveImage() {
    if (this.activeImage > 0) {
      this.activeImage--;
    } else {
      this.activeImage = this.imageUrls.length - 1;
    }
    this.cdr.detectChanges();
  }

  private subscribeToImageTimer(): Subscription {
    return this.imgTimer$.pipe(takeUntil(this.killImgTimer$)).subscribe(tick => {
      this.incrementActiveImage();
    })
  }

  ngOnDestroy() {
    if (!!this.timerSub){
      this.timerSub.unsubscribe();
    }
  }
}
