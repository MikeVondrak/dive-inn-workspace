import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html/safe-html.pipe';
import { PhoneNumberFormatPipe } from './phone-number-format/phone-number-format.pipe';


@NgModule({
  declarations: [
    SafeHtmlPipe,
    PhoneNumberFormatPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafeHtmlPipe,
    PhoneNumberFormatPipe,
  ]
})
export class PipesModule { }
