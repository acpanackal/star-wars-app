import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Film } from './films/film';
import { Character } from './characters/character';
import { Planet } from './planet/planet';
import {
  imageGlobalCharacters,
  imageGlobalPlanets,
  imageGlobalUrl,
  defaultImage,
} from './dummy-image-urls';
const swapiBaseURL = 'https://swapi.dev/api';
export const swapiPeopleURL = swapiBaseURL + '/people';
export const swapiFilmURL = swapiBaseURL + '/films';
export const swapiPlanetURL = swapiBaseURL + '/planets';
export interface ListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  filmsList: Film[];
  selectedFilm: Film;
  characterList: Character[];
  selectedCharacter: Character;
  planetsList: Planet[];
  selectedPlanet: Planet;
  constructor(private httpClient: HttpClient, public datepipe: DatePipe) {}
  // return Films for character details page
  getFilmsByCharacter(character: Character): Observable<Film[]> {
    return forkJoin(
      character.films.map((filmUrl) => {
        return this.httpClient.get<Film>(filmUrl).pipe(
          map((film) => {
            film.id = this.getFilmId(film.url);
            film.release_date = this.datepipe.transform(
              film.release_date,
              'dd.MM.yyyy'
            );
            for (const img of imageGlobalUrl) {
              if (img.name === film.title) {
                film.imageUrl = img.url;
              }
            }
            if (!film.imageUrl) {
              film.imageUrl = defaultImage;
            }
            return film;
          })
        );
      })
    );
  }
  getFilmsByPlanet(planet: Planet): Observable<Film[]> {
    return forkJoin(
      planet.films.map((filmUrl) => {
        return this.httpClient.get<Film>(filmUrl).pipe(
          map((film) => {
            film.id = this.getFilmId(film.url);
            film.release_date = this.datepipe.transform(
              film.release_date,
              'dd.MM.yyyy'
            );
            for (const img of imageGlobalUrl) {
              if (img.name === film.title) {
                film.imageUrl = img.url;
              }
            }
            if (!film.imageUrl) {
              film.imageUrl = defaultImage;
            }
            return film;
          })
        );
      })
    );
  }
  // return Characters for film details page
  getCharactersByFilm(film: Film): Observable<Character[]> {
    return forkJoin(
      film.characters.map((characterUrl) => {
        return this.httpClient.get<Character>(characterUrl).pipe(
          map((character) => {
            character.id = this.getCharacterId(character.url);
            for (const img of imageGlobalCharacters) {
              if (img.name === character.name) {
                character.imageUrl = img.url;
              }
            }
            if (!character.imageUrl) {
              character.imageUrl = defaultImage;
            }
            return character;
          })
        );
      })
    );
  }
  getPlanetsByFilm(film: Film): Observable<Planet[]> {
    return forkJoin(
      film.planets.map((characterUrl) => {
        return this.httpClient.get<Planet>(characterUrl).pipe(
          map((planet) => {
            planet.id = this.getPlanetId(planet.url);
            for (const img of imageGlobalPlanets) {
              if (img.name === planet.name) {
                planet.imageUrl = img.url;
              }
            }
            if (!planet.imageUrl) {
              planet.imageUrl = defaultImage;
            }
            return planet;
          })
        );
      })
    );
  }
  private getFilmId(filmUrl: string): number {
    return parseInt(
      filmUrl.substring(swapiFilmURL.length, filmUrl.length - 1),
      10
    );
  }
  public getPlanetId(characterUrl: string): number {
    return parseInt(
      characterUrl.substring(swapiPlanetURL.length, characterUrl.length - 1),
      10
    );
  }
  private getCharacterId(characterUrl: string): number {
    return parseInt(
      characterUrl.substring(swapiPeopleURL.length, characterUrl.length - 1),
      10
    );
  }
}
