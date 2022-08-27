import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateViewportOverlayDirective } from './animate-viewport-overlay/animate-viewport-overlay.directive';

@NgModule({
  declarations: [
    AnimateViewportOverlayDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnimateViewportOverlayDirective
  ]
})
export class DirectivesModule { }
