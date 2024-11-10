import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DecksComponent } from "./decks/decks.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DecksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'deck_ranking_client';
}
