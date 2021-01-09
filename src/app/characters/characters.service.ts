import { HttpClient } from '@angular/common/http';
import { Film } from './../films/films.service';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

const CHARACTER_HTTP_URL_LENGTH = `https://swapi.dev/api/people/`.length;
export interface Character {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  filmsData: Film[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}
export interface ListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  characterList: Character[];
  constructor(private httpClient: HttpClient) {}

  getCharactersList(pageNumber = 1): Observable<Character[]> {
    if (this.characterList) {
      return of(this.characterList);
    } else {
      return this.httpClient
        .get<ListResponse<Character>>(
          `https://swapi.dev/api/people/?page=${pageNumber}`
        )
        .pipe(
          map((data) =>
            data.results.map((Character) => {
              Character.id = this.getCharacterId(Character.url);
              return Character;
            })
          ),
          tap((characters) => (this.characterList = characters))
        );
    }
  }

  private getCharacterId(characterUrl: string): number {
    return parseInt(
      characterUrl.substring(
        CHARACTER_HTTP_URL_LENGTH,
        characterUrl.length - 1
      ),
      10
    );
  }
}
