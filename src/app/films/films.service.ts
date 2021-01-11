import {
  Character,
  CharactersService,
} from './../characters/characters.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

export interface Film {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  charactersData: Character[]; //character
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
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
const swapiFilmURL = 'https://swapi.py4e.com/api/films/';
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  filmsList: Film[];
  selectedFilm: Film;

  constructor(
    private httpClient: HttpClient,
    private characterService: CharactersService
  ) {}

  getFilms(): Observable<Film[]> {
    if (this.filmsList) {
      return of(this.filmsList);
    } else {
      return this.httpClient.get<ListResponse<Film>>(swapiFilmURL).pipe(
        map((data) =>
          data.results.map((film) => {
            film.id = this.getFilmId(film.url);
            //console.log(film.id);
            this.characterService
              .getCharactersByFilm(film)
              .subscribe((data) => {
                film.charactersData = data;
              });
            return film;
          })
        ),
        tap((films) => (this.filmsList = films))
      );
    }
    //return this.httpClient.get('https://swapi.dev/api/films');
  }
  getFilm(filmId: number): Observable<Film> {
    if (this.filmsList) {
      return of(this.filmsList.find((x) => x.id === filmId));
    } else {
      return this.httpClient.get<Film>(`${swapiFilmURL}/${filmId}`).pipe(
        map((film) => {
          film.id = this.getFilmId(film.url);
          this.characterService.getCharactersByFilm(film).subscribe((data) => {
            film.charactersData = data;
          });
          return film;
        })
      );
    }
  }

  //return Films for character details page
  getFilmsByCharacter(character: Character) {
    return forkJoin(
      character.films.map((filmUrl) => {
        return this.httpClient.get<Film>(filmUrl).pipe(
          map((film) => {
            film.id = this.getFilmId(film.url);
            return film;
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
}
