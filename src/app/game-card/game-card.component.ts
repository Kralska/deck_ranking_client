import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'game-card',
  standalone: true,
  imports: [
    MatListModule
  ],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {

}
