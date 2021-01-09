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
  //charactersData: string[]; //character
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
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
const FILM_HTTP_URL_LENGTH = `https://swapi.dev/api/films/`.length;
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  filmsList: Film[];
  constructor(private httpClient: HttpClient) {}

  getFilms(): Observable<Film[]> {
    if (this.filmsList) {
      return of(this.filmsList);
    } else {
      return this.httpClient
        .get<ListResponse<Film>>('https://swapi.dev/api/films')
        .pipe(
          map((data) =>
            data.results.map((film) => {
              film.id = this.getFilmId(film.url);
              return film;
            })
          ),
          tap((films) => (this.filmsList = films))
        );
    }
    //return this.httpClient.get('https://swapi.dev/api/films');
  }
  private getFilmId(filmUrl: string): number {
    return parseInt(
      filmUrl.substring(FILM_HTTP_URL_LENGTH, filmUrl.length - 1),
      10
    );
  }
}
