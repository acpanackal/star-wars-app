import { Character } from './character';
import { imageGlobalCharacters, defaultImage } from './../dummy-image-urls';
import { SwapiService, ListResponse, swapiPeopleURL } from './../swapi.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  characterList: Character[];
  selectedCharacter: Character;

  constructor(
    private httpClient: HttpClient,
    private swapiService: SwapiService,
    public datepipe: DatePipe
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
              for (let img of imageGlobalCharacters) {
                if (img.name === character.name) {
                  character.imageUrl = img.url;
                }
              }
              if (!character.imageUrl) {
                character.imageUrl = defaultImage;
              }
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

  getCharacter(characterId: number): Observable<Character> {
    return this.httpClient
      .get<Character>(`${swapiPeopleURL}/${characterId}`)
      .pipe(
        map((character) => {
          character.id = this.getCharacterId(character.url);
          for (let img of imageGlobalCharacters) {
            if (img.name === character.name) {
              character.imageUrl = img.url;
            }
          }
          if (!character.imageUrl) {
            character.imageUrl = defaultImage;
          }
          this.swapiService.getFilmsByCharacter(character).subscribe((data) => {
            character.filmsData = data;
          });
          return character;
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
