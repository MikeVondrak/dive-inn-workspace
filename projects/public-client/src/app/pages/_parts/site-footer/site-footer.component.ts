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
      fragment: '',
    },
    {
      uiLabel: 'Specials',
      linkUrl: '/menu',
      fragment: 'taki'
    },
    {
      uiLabel: 'Food',
      linkUrl: '/menu',
      fragment: 'cluck'
    },
    {
      uiLabel: 'Events',
      linkUrl: '/events',
      fragment: '',
    },
    {
      uiLabel: 'Find Us',
      linkUrl: '/find-us',
      fragment: '',
    },
  ];
  private _links2 = [
    {
      uiLabel: 'Games',
      linkUrl: '/construction',
      fragment: 'Games',
    },
    {
      uiLabel: 'Dive Shop',
      linkUrl: '/construction',
      fragment: 'Dive Shop',
    },
    {
      uiLabel: 'PADI Club',
      linkUrl: '/construction',
      fragment: 'P.A.D.I. Club',
    },
    {
      uiLabel: 'Sightings',
      linkUrl: '/construction',
      fragment: 'Sightings',
    },
    {
      uiLabel: 'Private Parties',
      linkUrl: '/construction',
      fragment: 'Private Parties',
    },
  ];
  private _links3 = [
    {
      uiLabel: 'About Us',
      linkUrl: '/construction',
      fragment: 'Abous Us',
    },        
    {
      uiLabel: 'News',
      linkUrl: '/construction',
      fragment: 'News',
    },
    {
      uiLabel: 'Jobs',
      linkUrl: '/construction',
      fragment: 'Jobs',
    },
    {
      uiLabel: 'Partnerships',
      linkUrl: '/construction',
      fragment: 'Partnerships',
    },
    {
      uiLabel: 'Site Info',
      linkUrl: '/construction',
      fragment: 'Site Info',
    },
  ];

  // add property to each links array
  private links1 = this._links1.map(link => ({ ...link, active: true }));
  private links2 = this._links2.map(link => ({ ...link, active: false }));
  private links3 = this._links3.map(link => ({ ...link, active: false }));
  
  public linksArray: ExpandingMenuLinkGroup[] = [
    {
      title: this.linkHeaders[0],
      links: this.links1
    },
    {
      title: this.linkHeaders[1],
      links: this.links2
    },
    {
      title: this.linkHeaders[2],
      links: this.links3
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
