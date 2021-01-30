import { ListResponse, swapiFilmURL, SwapiService } from './../swapi.service';
import { Film } from './film';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { imageGlobalUrl, defaultImage } from './../dummy-image-urls';
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  filmsList: Film[];
  selectedFilm: Film;
  constructor(
    private httpClient: HttpClient,
    private swapiService: SwapiService,
    public datepipe: DatePipe
  ) {}

  getFilms(): Observable<Film[]> {
    if (this.filmsList) {
      return of(this.filmsList);
    } else {
      return this.httpClient.get<ListResponse<Film>>(swapiFilmURL).pipe(
        map((data) =>
          data.results.map((film) => {
            film.id = this.getFilmId(film.url);
            film.release_date = this.datepipe.transform(
              film.release_date,
              'dd.MM.yyyy'
            );
            for (let img of imageGlobalUrl) {
              if (img.name === film.title) {
                film.imageUrl = img.url;
              }
            }
            if (!film.imageUrl) {
              film.imageUrl = defaultImage;
            }
            this.swapiService.getCharactersByFilm(film).subscribe((data) => {
              film.charactersData = data;
            });
            this.swapiService.getPlanetsByFilm(film).subscribe((data) => {
              film.planetsData = data;
            });
            return film;
          })
        ),
        tap((films) => (this.filmsList = films))
      );
    }
  }
  getFilm(filmId: number): Observable<Film> {
    return this.httpClient.get<Film>(`${swapiFilmURL}/${filmId}`).pipe(
      map((film) => {
        film.id = this.getFilmId(film.url);
        film.release_date = this.datepipe.transform(
          film.release_date,
          'dd.MM.yyyy'
        );
        for (let img of imageGlobalUrl) {
          if (img.name === film.title) {
            film.imageUrl = img.url;
          }
        }
        if (!film.imageUrl) {
          film.imageUrl = defaultImage;
        }
        this.swapiService.getCharactersByFilm(film).subscribe((data) => {
          film.charactersData = data;
        });
        this.swapiService.getPlanetsByFilm(film).subscribe((data) => {
          film.planetsData = data;
        });
        return film;
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
