import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../abstract/base/base.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() checkboxId: string;
  @Input() title: string;
  @Input() disabled: boolean = true;
  @Input() checkedValue: boolean;

  @Output() onOptionChange = new EventEmitter<boolean>();


  constructor() {
    super();
    this.loggerService.enableLogger(true);
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onNgModelChange($event) {
    this.loggerService.log('onNgModelChange', $event);
    this.onOptionChange.emit($event);
  }
}
