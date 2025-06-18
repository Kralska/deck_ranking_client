import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game, GamePlacement } from '../interfaces/game';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Deck } from '../interfaces/deck';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly gameUrl: string = environment.serverUrl + '/games'

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

  static convertGameResponseToGame(response: any): Game | undefined{
    let id: number | undefined;
    let playedAt: Date | undefined;
    let participants: number | undefined;
    let placements: [GamePlacement] | undefined;
    if(response.id){
      id = response.id;
    }
    if(response.playedAt){
      playedAt = new Date(Date.parse(response.playedAt));
    }
    if(response.participants){
      participants = response.participants;
    }
    if(response.placements){
      placements = response.placements
    }

    if(!id || !playedAt || !participants || !placements){
      return undefined;
    }
    return {
      id: id,
      playedAt: playedAt,
      participants: participants,
      placements: placements
    };
  }
}
