import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
