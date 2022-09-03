import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteFooterComponent } from './site-footer/site-footer.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteNavComponent } from './site-nav/site-nav.component';
//import { SitePageComponent } from './site-page/site-page.component';
import { RouterModule } from '@angular/router';

import { DirectivesModule } from '@dive-inn-lib';
@NgModule({
  declarations: [
    SiteHeaderComponent,
    SiteNavComponent,
    SiteFooterComponent,
    //SitePageComponent,
  ],
  imports: [
    CommonModule, 
    RouterModule,
    DirectivesModule,
  ],
  exports: [
    SiteHeaderComponent,
    SiteNavComponent,
    SiteFooterComponent,
    //SitePageComponent,
  ]
})
export class SitePartsModule {}
