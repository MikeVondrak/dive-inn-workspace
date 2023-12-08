import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DirectivesModule } from '@dive-inn-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

import * as Hammer from 'hammerjs';
//import 'hammerjs';

const hammerConfig: HammerGestureConfig = {
  events: ['swipe'],
  overrides: {},
  buildHammer(element) {
    const h = new Hammer(new HTMLElement());
    return h;
  },
  //   swipe: { direction: Hammer.DIRECTION_HORIZONTAL }
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    AppRoutingModule,
    PagesModule,
    DirectivesModule,
    ComponentsModule,
  ],
  exports: [
  ],
  providers: [
    // {
    //   provide: HAMMER_GESTURE_CONFIG, useValue: hammerConfig
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
