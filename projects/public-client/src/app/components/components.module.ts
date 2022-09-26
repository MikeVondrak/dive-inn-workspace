import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseTrackerComponent } from './mouse-tracker/mouse-tracker.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { DirectivesModule } from '@dive-inn-lib';
import { FoodLogosComponent } from './food-logos/food-logos.component';
import { ContactBannerComponent } from './contact-banner/contact-banner.component';
import { IconCardComponent } from './icon-card/icon-card.component';
import { TextBlurbComponent } from './text-blurb/text-blurb.component';

@NgModule({
  declarations: [
    MouseTrackerComponent,
    HeroBannerComponent,
    FoodLogosComponent,
    ContactBannerComponent,
    IconCardComponent,
    TextBlurbComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    MouseTrackerComponent,
    HeroBannerComponent,
    FoodLogosComponent,
    ContactBannerComponent,
    IconCardComponent,
    TextBlurbComponent,
  ]
})
export class ComponentsModule { }
