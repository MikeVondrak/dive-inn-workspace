import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
