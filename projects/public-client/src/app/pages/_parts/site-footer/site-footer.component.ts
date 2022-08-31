import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent implements OnInit {

  @Input() address: string = '1380 S Broadway'; // @TODO - get these defaults from GQL
  @Input() phone: string = '720-242-6157';

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
    {
      uiLabel: 'Private Parties',
      linkUrl: '/inside',
      fragment: 'construction',
    },
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
      uiLabel: 'Dive Shop',
      linkUrl: '/inside',
      fragment: 'construction',
    },
    {
      uiLabel: 'News',
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

  constructor() { }

  ngOnInit(): void {
  }

}
