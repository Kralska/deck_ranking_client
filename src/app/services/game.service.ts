import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly gameUrl: string = 'http://localhost:8080/api/games'

  private games$: Observable<Game[]> = new Observable<Game[]>;
  private gameArray$: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);

  private games: Map<number, Game> = new Map<number, Game>();

  constructor(private http: HttpClient) { 
    this.games$ = this.http.get<Game[]>(this.gameUrl);
    this.updateGames();
  }

  updateGames() {
    this.games$.subscribe(games => {
      this.games.clear();
      this.games.forEach(game => {
        this.games.set(game.id!, game);
      });

      this.gameArray$.next(games);
    });
  }

  getGames() : Observable<Game[]>{
    return this.gameArray$;
  }

  getGame(id: number): Game | undefined{
    return this.games.get(id);
  }

  addGame(game: Game) {
    this.http.post<Game>(this.gameUrl, game).subscribe(game => {
      let games: Game[] =  this.gameArray$.getValue();
      games.push(game);
      this.gameArray$.next(games);
    });
  }
}
