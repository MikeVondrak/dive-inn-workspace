import { Component, ElementRef, Input, OnInit, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavItem } from '../../../models/site-nav-item.model';
import { PageSelectAnimation } from './site-nav.component.animations';

@Component({
  selector: 'app-site-nav',
  templateUrl: './site-nav.component.html',
  styleUrls: ['./site-nav.component.scss'],
  animations: [PageSelectAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteNavComponent implements OnInit {

  @Input() navItems: NavItem[] = [];
  @Output() onNavExpand: EventEmitter<boolean> = new EventEmitter<boolean>();

  public navExpanded: boolean = true;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let currentRoute = val.url;
        if (currentRoute === '/') {
          currentRoute = '/home';
        }
        let fragmentIndex = currentRoute.indexOf('#');
        if (fragmentIndex > 0) {
          currentRoute = currentRoute.substring(0, fragmentIndex);
        }
        const initialSelection = this.navItems.find(navItem => navItem.url === currentRoute);
        if (!!initialSelection) {
          this.selectPage(initialSelection);
        } else {
          this.clearSelection();
        }
      }
    });
  }

  public navTrackBy(index: number, item: NavItem) {
    return item.title;
  }

  public clearSelection() {
    this.navItems.forEach(nav => {
      nav.filledState = false;      
    });
    this.cdr.detectChanges();
  }

  public selectPage(navItem: NavItem | undefined) {
    this.clearSelection();
    if (!navItem) {
      return;
    }
    navItem.filledState = true;
    this.cdr.detectChanges();
    console.log('SITE NAV - navItem', navItem);
  }

  public toggleNav() {
    this.navExpanded = !this.navExpanded;
    this.onNavExpand.emit(this.navExpanded);
  }
}
