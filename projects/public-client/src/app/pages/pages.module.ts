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

@NgModule({
  declarations: [
    HomeComponent,
    InsideComponent,
    MenuComponent,
    EventsComponent,
    FindUsComponent,
    ConstructionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GoogleMapsModule,
    DirectivesModule,
    SitePartsModule,
    ComponentsModule,    
  ],
  exports: [
    SitePartsModule,
    DirectivesModule,
  ]
})
export class PagesModule { }
