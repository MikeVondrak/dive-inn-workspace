import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseTrackerComponent } from './mouse-tracker/mouse-tracker.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';

@NgModule({
  declarations: [
    MouseTrackerComponent,
    HeroBannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MouseTrackerComponent
  ]
})
export class ComponentsModule { }
