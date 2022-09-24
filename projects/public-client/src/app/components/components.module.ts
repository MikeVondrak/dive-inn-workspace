import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseTrackerComponent } from './mouse-tracker/mouse-tracker.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { DirectivesModule } from '@dive-inn-lib';

@NgModule({
  declarations: [
    MouseTrackerComponent,
    HeroBannerComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    MouseTrackerComponent,
    HeroBannerComponent,
  ]
})
export class ComponentsModule { }
