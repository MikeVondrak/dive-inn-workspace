import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DirectivesModule } from '@dive-inn-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

import 'hammerjs';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
