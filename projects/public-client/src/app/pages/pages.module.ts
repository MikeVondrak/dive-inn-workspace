import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DirectivesModule } from '@dive-inn-lib';

import { HomeComponent } from './home/home.component';
import { InsideComponent } from './inside/inside.component';
import { MenuComponent } from './menu/menu.component';
import { SitePartsModule } from './_parts/site-parts.module';

@NgModule({
  declarations: [
    HomeComponent,
    InsideComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule,
    SitePartsModule,
  ],
  exports: [
    SitePartsModule,
  ]
})
export class PagesModule { }
