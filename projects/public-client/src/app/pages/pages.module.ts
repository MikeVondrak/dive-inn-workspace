import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GoogleMapsModule } from '@angular/google-maps';

import { DirectivesModule } from '@dive-inn-lib';

import { HomeComponent } from './home/home.component';
import { InsideComponent } from './inside/inside.component';
import { MenuComponent } from './menu/menu.component';
import { SitePartsModule } from './_parts/site-parts.module';
import { ComponentsModule } from '../components/components.module';
import { EventsComponent } from './events/events.component';
import { FindUsComponent } from './find-us/find-us.component';
import { ConstructionComponent } from './construction/construction.component';
import { PrivatePartiesComponent } from './private-parties/private-parties.component';
import { PipesModule } from 'projects/dive-inn-lib/src/lib/pipes/pipes.module';
import { TourComponent } from './tour/tour.component';
import { SiteInfoComponent } from './site-info/site-info.component';

@NgModule({
  declarations: [
    HomeComponent,
    InsideComponent,
    MenuComponent,
    EventsComponent,
    FindUsComponent,
    ConstructionComponent,
    PrivatePartiesComponent,
    TourComponent,
    SiteInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GoogleMapsModule,
    DirectivesModule,
    SitePartsModule,
    ComponentsModule,
    PipesModule,
  ],
  exports: [
    SitePartsModule,
    DirectivesModule,
  ]
})
export class PagesModule { }
