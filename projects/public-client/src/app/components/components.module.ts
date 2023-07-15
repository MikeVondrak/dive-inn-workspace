import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseTrackerComponent } from './mouse-tracker/mouse-tracker.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { DirectivesModule } from '@dive-inn-lib';
import { FoodLogosComponent } from './food-logos/food-logos.component';
import { ContactBannerComponent } from './contact-banner/contact-banner.component';
import { IconCardComponent } from './icon-card/icon-card.component';
import { TextBlurbComponent } from './text-blurb/text-blurb.component';
import { ExpandingMenuComponent } from './expanding-menu/expanding-menu.component';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselPaneComponent } from './carousel/carousel-pane/carousel-pane.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RentalMapComponent } from './rental-map/rental-map.component';
import { RentalSpaceOverlayComponent } from './rental-map/rental-space-overlay/rental-space-overlay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumDisplayComponent } from './album-display/album-display.component';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { ImageFlipComponent } from './image-flip/image-flip.component';

@NgModule({
  declarations: [
    MouseTrackerComponent,
    HeroBannerComponent,
    FoodLogosComponent,
    ContactBannerComponent,
    IconCardComponent,
    TextBlurbComponent,
    ExpandingMenuComponent,
    CarouselComponent,
    CarouselPaneComponent,
    ReservationFormComponent,
    RentalMapComponent,
    RentalSpaceOverlayComponent,
    AlbumDisplayComponent,
    ImageDisplayComponent,
    ImageFlipComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    //BrowserAnimationsModule,
  ],
  exports: [
    MouseTrackerComponent,
    HeroBannerComponent,
    FoodLogosComponent,
    ContactBannerComponent,
    IconCardComponent,
    TextBlurbComponent,
    ExpandingMenuComponent,
    CarouselComponent,
    ReservationFormComponent,
    RentalMapComponent,
    RentalSpaceOverlayComponent,
    AlbumDisplayComponent,
    ImageDisplayComponent,
    ImageFlipComponent,
  ]
})
export class ComponentsModule { }
