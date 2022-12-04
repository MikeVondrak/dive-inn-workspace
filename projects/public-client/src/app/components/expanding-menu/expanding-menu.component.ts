import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BreakpointsEnum } from '@dive-inn-lib';
import { ViewportService } from 'projects/dive-inn-lib/src/lib/services/viewport/viewport.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ExpandingMenuLink, ExpandingMenuLinkGroup, ExpandingMenuStateEnum } from '../../models/expanding-menu.model';
@Component({
  selector: 'app-expanding-menu',
  templateUrl: './expanding-menu.component.html',
  styleUrls: ['./expanding-menu.component.scss']
})
export class ExpandingMenuComponent implements OnInit, OnDestroy {

  @Input() menuItems: ExpandingMenuLinkGroup[] = [];
  @Output() expandingMenuState: EventEmitter<ExpandingMenuStateEnum> = new EventEmitter();

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

  public onClickExpandMenu() {
    this.isExpanded = !this.isExpanded;
    const menuState = this.isExpanded ? ExpandingMenuStateEnum.OPEN : ExpandingMenuStateEnum.CLOSED;
    this.expandingMenuState.emit(menuState);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
