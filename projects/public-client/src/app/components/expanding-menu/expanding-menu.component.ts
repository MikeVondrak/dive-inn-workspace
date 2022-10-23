import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointsEnum } from '@dive-inn-lib';
import { ViewportService } from 'projects/dive-inn-lib/src/lib/services/viewport/viewport.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ExpandingMenuLink, ExpandingMenuLinkGroup } from '../../models/expanding-menu.model';
@Component({
  selector: 'app-expanding-menu',
  templateUrl: './expanding-menu.component.html',
  styleUrls: ['./expanding-menu.component.scss']
})
export class ExpandingMenuComponent<ExpandingMenuHeaderEnum> implements OnInit, OnDestroy {

  @Input() menuItems: ExpandingMenuLinkGroup[] = [];

  public isExpanded: boolean = false;
  public selectedGroup: string = 'Main';
  public vpIsSmallOrBigger$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(private viewportService: ViewportService,) {
    this.vpIsSmallOrBigger$ = this.viewportService.viewportState$.pipe(
      takeUntil(this.destroy$),
      map((vpState) => {
        const gtBp = this.viewportService.getAtOrAboveBp(BreakpointsEnum.sm);
        return gtBp;
      }),
    );

  }

  ngOnInit(): void {
  }

  public onClick(item: ExpandingMenuLinkGroup) {
    this.selectedGroup = item.title;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
