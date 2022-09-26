import { Component, ElementRef, Input, OnInit, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavItem } from '../site-header/site-header.component';
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
        const initialSelection = this.navItems.find(navItem => navItem.url === currentRoute);
        this.selectPage(initialSelection);
      }
    });
  }
  
  public navTrackBy(index: number, item: NavItem) {    
    return item.title;
  }
  
  public selectPage(navItem: NavItem | undefined) {
    if (!navItem) {
      return;
    }
    this.navItems.forEach(nav => {
      nav.filledState = false;
    });
    navItem.filledState = true;    
    this.cdr.detectChanges();
  }

  public toggleNav() {
    this.navExpanded = !this.navExpanded;
    this.onNavExpand.emit(this.navExpanded);
  }
}
