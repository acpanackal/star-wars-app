import { HttpClient } from '@angular/common/http';
import { Film, SwapiService } from './../swapi.service';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

const swapiPeopleURL = 'https://swapi.py4e.com/api/people/';

const CHARACTER_HTTP_URL_LENGTH = swapiPeopleURL.length;
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
  imageUrl: string;
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
  selectedCharacter: Character;

  constructor(
    private httpClient: HttpClient,
    private swapiService: SwapiService
  ) {}

  getCharactersList(pageNumber = 1): Observable<Character[]> {
    if (this.characterList) {
      return of(this.characterList);
    } else {
      return this.httpClient
        .get<ListResponse<Character>>(`${swapiPeopleURL}?page=${pageNumber}`)
        .pipe(
          map((data) =>
            data.results.map((character) => {
              character.id = this.getCharacterId(character.url);
              this.swapiService
                .getFilmsByCharacter(character)
                .subscribe((data) => {
                  character.filmsData = data;
                });
              return character;
            })
          ),
          tap((characters) => (this.characterList = characters))
        );
    }
  }
  //return Characters for film details page
  getCharactersByFilm(film: Film) {
    return forkJoin(
      film.characters.map((characterUrl) => {
        return this.httpClient.get<Character>(characterUrl).pipe(
          map((character) => {
            character.id = this.getCharacterId(character.url);
            this.swapiService
              .getFilmsByCharacter(character)
              .subscribe((data) => {
                character.filmsData = data;
              });
            return character;
          })
        );
      })
    );
  }

  private getCharacterId(characterUrl: string): number {
    return parseInt(
      characterUrl.substring(swapiPeopleURL.length, characterUrl.length - 1),
      10
    );
  }
}
