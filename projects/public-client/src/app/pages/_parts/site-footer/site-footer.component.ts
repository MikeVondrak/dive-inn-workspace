import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BreakpointsEnum } from '@dive-inn-lib';
import { ViewportService } from 'projects/dive-inn-lib/src/lib/services/viewport/viewport.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent implements OnInit {

  @Input() address: string = '1380 S Broadway'; // @TODO - get these defaults from GQL
  @Input() phone: string = '720-242-6157';

  public linkHeaders = [
    'Main',
    'Party',
    'Business',
  ];

  public links = [
    {
      uiLabel: 'Home',
      linkUrl: '/home',
      fragment: 'pageTop',
    },
    {
      uiLabel: 'Menu',
      linkUrl: '/menu',
      fragment: ''
    },
    {
      uiLabel: 'Specials',
      linkUrl: '/menu',
      fragment: '',
    },
    {
      uiLabel: 'Events',
      linkUrl: '/inside',
      fragment: 'construction',
    },
  ];
  public links2 = [
    {
      uiLabel: 'Private Parties',
      linkUrl: '/inside',
      fragment: 'construction',
    },
    {
      uiLabel: 'Dive Shop',
      linkUrl: '/inside',
      fragment: 'construction',
    },
    {
      uiLabel: 'PADI Club',
      linkUrl: '/inside',
      fragment: 'construction',
    },
    {
      uiLabel: 'Sightings',
      linkUrl: '/inside',
      fragment: 'construction',
    },
  ];
  public links3 = [
    {
      uiLabel: 'About Us',
      linkUrl: '/inside',
      fragment: 'construction',
    },
    {
      uiLabel: 'Partnerships',
      linkUrl: '/inside',
      fragment: 'construction',
    },
    {
      uiLabel: 'Jobs',
      linkUrl: '/inside',
      fragment: 'construction',
    },
    {
      uiLabel: 'News',
      linkUrl: '/inside',
      fragment: 'construction',
    },
  ];
  public linksArray = [this.links, this.links2, this.links3];

  public showMobileMenu: boolean = true;

  constructor(private cdr: ChangeDetectorRef, private viewportService: ViewportService) { }

  ngOnInit(): void {
    this.viewportService.viewportState$.subscribe(state => {
      if (state.currentBreakpoint === BreakpointsEnum.zero || 
          state.currentBreakpoint === BreakpointsEnum.min ||
          state.currentBreakpoint === BreakpointsEnum.xs ||
          state.currentBreakpoint === BreakpointsEnum.sm ||
          state.currentBreakpoint === BreakpointsEnum.md //||
      //    state.currentBreakpoint === BreakpointsEnum.lg
      ) {
        this.showMobileMenu = true;
      } else {
        this.showMobileMenu = false;      
      }
      this.cdr.markForCheck();
    });
  }

}
