// https://roufid.com/warning-sanitizing-unsafe-url-value-angular/

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: any, type: string = 'html'): any {
    let safe: SafeHtml = '';
    switch (type) {
      case 'html': safe = this.sanitizer.bypassSecurityTrustHtml(value); break;
      case 'url': safe = this.sanitizer.bypassSecurityTrustUrl(value); break;
      default: console.error(`invalid safeHtml pipe value: ${type}`);
    }
    return safe;
  }

}