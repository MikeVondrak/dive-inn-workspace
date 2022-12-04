import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateViewportOverlayDirective } from './animate-viewport-overlay/animate-viewport-overlay.directive';
import { MouseTrackerDirective } from './mouse-tracker/mouse-tracker.directive';

@NgModule({
  declarations: [
    AnimateViewportOverlayDirective,
    MouseTrackerDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnimateViewportOverlayDirective,
    MouseTrackerDirective,
  ]
})
export class DirectivesModule { }
