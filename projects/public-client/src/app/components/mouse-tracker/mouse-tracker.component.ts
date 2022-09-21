import { Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mouse-tracker',
  templateUrl: './mouse-tracker.component.html',
  styleUrls: ['./mouse-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseTrackerComponent implements OnInit {
  @ViewChild('MouseTracker') mouseFacer?: ElementRef; // optional property to avoid having to initialize
 
  /**
   * CSS bg position value
   */
  @HostBinding('style.--bgPosition') 
  @Input() bgPosition: string | undefined = '0% 0%';

  @HostBinding('style.--bgSize')
  @Input() bgSize: string | undefined = '100% 100%';

  @HostBinding('style.--imgSrc') 
  @Input() imgSrc: string = 'url()';

  /**
   * constructor
   */
  constructor() { }

  ngOnInit(): void {
  }
}
