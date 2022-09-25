import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseTrackerComponent } from './mouse-tracker/mouse-tracker.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { DirectivesModule } from '@dive-inn-lib';
import { FoodLogosComponent } from './food-logos/food-logos.component';

@NgModule({
  declarations: [
    MouseTrackerComponent,
    HeroBannerComponent,
    FoodLogosComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    MouseTrackerComponent,
    HeroBannerComponent,
    FoodLogosComponent,
  ]
})
export class ComponentsModule { }
