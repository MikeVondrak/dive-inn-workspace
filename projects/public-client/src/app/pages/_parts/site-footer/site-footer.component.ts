import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BreakpointsEnum } from '@dive-inn-lib';
import { ViewportService } from 'projects/dive-inn-lib/src/lib/services/viewport/viewport.service';
import { ExpandingMenuLink, ExpandingMenuLinkGroup } from '../../../models/expanding-menu.model';

enum FooterLinkHeadersEnum {
  MAIN = 'Main', FUN = 'Fun', BUSINESS = 'Business'
}

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent implements OnInit {

  @Input() address: string = '1380 S Broadway'; // @TODO - get these defaults from GQL
  @Input() phone: string = '720-242-6157';

  public linkHeaders: string[] = [
    FooterLinkHeadersEnum.MAIN,
    FooterLinkHeadersEnum.FUN,
    FooterLinkHeadersEnum.BUSINESS,
  ];

  private _links1 = [
    {
      uiLabel: 'Home',
      linkUrl: '/home',
      fragment: 'pageTop',
    },
    {
      uiLabel: 'Food',
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
      linkUrl: '/events',
      fragment: '',
    },
  ];
  private _links2 = [
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
  private _links3 = [
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

  // add 'header' property to each links array
  // private links1 = this._links1.map(link => ({ ...link, header: this.linkHeaders[0] }));
  // private links2 = this._links2.map(link => ({ ...link, header: this.linkHeaders[1] }));
  // private links3 = this._links3.map(link => ({ ...link, header: this.linkHeaders[2] }));
  
  public linksArray: ExpandingMenuLinkGroup[] = [
    {
      title: this.linkHeaders[0],
      links: this._links1
    },
    {
      title: this.linkHeaders[1],
      links: this._links2
    },
    {
      title: this.linkHeaders[2],
      links: this._links3
    }
  ];

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
        this.showMobileMenu = true;// false;      
      }
      this.cdr.markForCheck();
    });
  }

}
