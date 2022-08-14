import { Component, Input } from '@angular/core';
import { Player } from '../player/player';

@Component({
  selector: 'app-square',
  template: `<p>{{ value }}</p>`,
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {

  @Input() value?: any;
}
