import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives/directives.module';
import { GraphQLModule } from './graphql/graphql.module';


@NgModule({
  declarations: [
  ],
  imports: [
    DirectivesModule,
    GraphQLModule,
  ],
  exports: [
    DirectivesModule,
    GraphQLModule,
  ]
})
export class DiveInnLibModule { }
