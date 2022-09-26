import { Component, Inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, fromEvent, Subject } from 'rxjs';
import { debounce, debounceTime, filter, map, startWith, takeUntil } from 'rxjs/operators';

export interface NavItem {
  url: string,
  title: string,
  filledState: boolean,
}
@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent implements OnInit, OnDestroy {
  public showLogo: boolean = false;
  public navItems: NavItem[] = [
    {url: '/home', title: 'Home', filledState: false},
    {url: '/menu', title: 'Menu', filledState: false},
    {url: '/inside', title: 'Events', filledState: false},
    {url: '/find-us', title: 'Find Us', filledState: false},
  ]

  public isNavExpanded: boolean = true;
  private window: any;
  private destroy$ = new Subject<void>();
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.window = this.document.defaultView;
  }

  ngOnInit(): void {

    // Watch scrollTop and page loads to show/hide header logo
    const scroll$ = fromEvent(this.window, 'scroll').pipe(debounceTime(100), map(e => !!e), startWith(true));
    const navigate$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd), map(e => !!e));
    combineLatest([
      scroll$,
      navigate$,
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => { // @TODO - syntax for types on args?
      const scrollVal = this.document?.scrollingElement?.scrollTop || 0;
      if (scrollVal > 250) {
        this.showLogo = true;
      } else {
        this.showLogo = false;
      }
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public navExpanded(expanded: boolean) {
    this.isNavExpanded = expanded;
  }
}
