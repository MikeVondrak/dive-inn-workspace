import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseTrackerDirective } from './mouse-tracker/mouse-tracker.directive';

@NgModule({
  declarations: [
    MouseTrackerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MouseTrackerDirective
  ]
})
export class DirectivesModule { }
