import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives/directives.module';


@NgModule({
  declarations: [
  ],
  imports: [
    DirectivesModule,
  ],
  exports: [
    DirectivesModule,
  ]
})
export class DiveInnLibModule { }
