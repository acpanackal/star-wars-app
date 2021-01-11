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
const swapiPeopleURL = 'https://swapi.py4e.com/api/people/';
const swapiFilmURL = 'https://swapi.py4e.com/api/films/';
const imageBaseURL = '../../../assets/images/';
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
const imageGlobalUrl = [
  { name: 'Return of the Jedi', url: imageBaseURL + 'returnofthejedi.jpeg' },
  { name: 'A New Hope', url: imageBaseURL + 'anewhope.png' },
  {
    name: 'The Empire Strikes Back',
    url: imageBaseURL + 'theempirestrikes.jpg',
  },
  { name: 'The Phantom Menace', url: imageBaseURL + 'phantommenace.jpg' },
  { name: 'Attack of the Clones', url: imageBaseURL + 'attackofclones.jpg' },
  { name: 'Revenge of the Sith', url: imageBaseURL + 'revenge.jpg' },
  { name: 'The Force Awakens', url: imageBaseURL + 'Theforceawakens.jpg' },
];
const imageGlobalCharacters = [
  { name: 'Luke Skywalker', url: imageBaseURL + 'Luke-Skywalker.jpg' },
  { name: 'C-3PO', url: imageBaseURL + 'C-3PO.png' },
  { name: 'R2-D2', url: imageBaseURL + 'R2-D2.jpg' },
  { name: 'Darth Vader', url: imageBaseURL + 'darth-vader.jpeg' },
  { name: 'Leia Organa', url: imageBaseURL + 'Leia-Organa.jpeg' },
  //{ name: 'Owen Lars', url: imageBaseURL + 'Owen-Lars.png' },
  { name: 'Beru Whitesun lars', url: imageBaseURL + 'BeruWhitesunLars.jpg' },
];
const defaultImage = imageBaseURL + 'revenge.jpg';
@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  filmsList: Film[];
  selectedFilm: Film;
  characterList: Character[];
  selectedCharacter: Character;

  constructor(private httpClient: HttpClient) {}

  getFilms(): Observable<Film[]> {
    if (this.filmsList) {
      return of(this.filmsList);
    } else {
      return this.httpClient.get<ListResponse<Film>>(swapiFilmURL).pipe(
        map((data) =>
          data.results.map((film) => {
            film.id = this.getFilmId(film.url);
            for (let img of imageGlobalUrl) {
              if (img.name === film.title) {
                film.imageUrl = img.url;
              }
            }
            if (!film.imageUrl) {
              film.imageUrl = defaultImage;
            }
            this.getCharactersByFilm(film).subscribe((data) => {
              film.charactersData = data;
            });
            //console.log(film.charactersData);
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
          for (let img of imageGlobalUrl) {
            if (img.name === film.title) {
              film.imageUrl = img.url;
            }
          }
          if (!film.imageUrl) {
            film.imageUrl = defaultImage;
          }
          this.getCharactersByFilm(film).subscribe((data) => {
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
            for (let img of imageGlobalUrl) {
              if (img.name === film.title) {
                film.imageUrl = img.url;
              }
            }
            if (!film.imageUrl) {
              film.imageUrl = defaultImage;
            }
            this.getCharactersByFilm(film).subscribe((data) => {
              film.charactersData = data;
            });
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
                  //console.log(img.url);
                }
              }
              if (!character.imageUrl) {
                character.imageUrl = defaultImage;
              }
              this.getFilmsByCharacter(character).subscribe((data) => {
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
            this.getFilmsByCharacter(character).subscribe((data) => {
              character.filmsData = data;
            });
            return character;
          })
        );
      })
    );
  }
  getCharacter(characterId: number): Observable<Character> {
    if (this.characterList) {
      return of(this.characterList.find((x) => x.id === characterId));
    } else {
      return this.httpClient
        .get<Character>(`${swapiPeopleURL}/${characterId}`)
        .pipe(
          map((character) => {
            character.id = this.getCharacterId(character.url);
            this.getFilmsByCharacter(character).subscribe((data) => {
              character.filmsData = data;
            });
            return character;
          })
        );
    }
  }
  private getCharacterId(characterUrl: string): number {
    return parseInt(
      characterUrl.substring(swapiPeopleURL.length, characterUrl.length - 1),
      10
    );
  }
}
