import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
const swapiBaseURL = 'https://swapi.dev/api';
const swapiPeopleURL = swapiBaseURL + '/people';
const swapiFilmURL = swapiBaseURL + '/films';
const swapiPlanetURL = swapiBaseURL + '/planets';
const imageBaseURL = '../../../assets/images/';
const CHARACTER_HTTP_URL_LENGTH = swapiPeopleURL.length;

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

export interface Planet {
  id: number;
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  filmsData: Film[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  residentsData: Character[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
  imageUrl: string;
}

export interface ListResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
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
  { name: 'R5-D4', url: imageBaseURL + 'R5d4.jpg' },
  {
    name: 'Biggs Darklighter',
    url: '../../../assets/images/Biggs.jpg',
  },
  {
    name: 'Obi-Wan Kenobi',
    url: '../../../assets/images/Obi-Wan-Kenobi.png',
  },
  { name: 'Darth Vader', url: imageBaseURL + 'darth-vader.jpeg' },
  { name: 'Leia Organa', url: imageBaseURL + 'Leia-Organa.JPG' },
  { name: 'Owen Lars', url: imageBaseURL + 'Owen.jpg' },
  { name: 'Beru Whitesun lars', url: imageBaseURL + 'BeruWhitesunLars.jpg' },
];
const imageGlobalPlanets = [
  { name: 'Tatooine', url: imageBaseURL + 'tatooine.png' },
  { name: 'Alderaan', url: imageBaseURL + 'Alderaan.jpg' },
  { name: 'Yavin IV', url: imageBaseURL + 'Yavin-4-SWCT.png' },
];
const defaultImage = imageBaseURL + 'no-image-available.jpg';

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
  //Fime
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
            this.getCharactersByFilm(film).subscribe((data) => {
              film.charactersData = data;
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
        this.getCharactersByFilm(film).subscribe((data) => {
          film.charactersData = data;
        });
        return film;
      })
    );
  }

  //return Films for character details page
  getFilmsByCharacter(character: Character) {
    return forkJoin(
      character.films.map((filmUrl) => {
        return this.httpClient.get<Film>(filmUrl).pipe(
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
            return film;
          })
        );
      })
    );
  }
  getFilmsByPlanet(planet: Planet) {
    return forkJoin(
      planet.films.map((filmUrl) => {
        return this.httpClient.get<Film>(filmUrl).pipe(
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
            for (let img of imageGlobalCharacters) {
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
          this.getFilmsByCharacter(character).subscribe((data) => {
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
  getPlanets(): Observable<Planet[]> {
    if (this.planetsList) {
      return of(this.planetsList);
    } else {
      return this.httpClient.get<ListResponse<Planet>>(swapiPlanetURL).pipe(
        map((data) =>
          data.results.map((planet) => {
            planet.id = this.getPlanetId(planet.url);
            for (let img of imageGlobalPlanets) {
              if (img.name === planet.name) {
                planet.imageUrl = img.url;
              }
            }
            if (!planet.imageUrl) {
              planet.imageUrl = defaultImage;
            }
            this.getFilmsByPlanet(planet).subscribe((data) => {
              planet.filmsData = data;
            });
            return planet;
          })
        ),
        tap((planets) => (this.planetsList = planets))
      );
    }
  }
  getPlanet(planetId: number): Observable<Planet> {
    return this.httpClient.get<Planet>(`${swapiPlanetURL}/${planetId}`).pipe(
      map((planet) => {
        planet.id = this.getCharacterId(planet.url);
        for (let img of imageGlobalPlanets) {
          if (img.name === planet.name) {
            planet.imageUrl = img.url;
          }
        }
        if (!planet.imageUrl) {
          planet.imageUrl = defaultImage;
        }
        this.getFilmsByPlanet(planet).subscribe((data) => {
          planet.filmsData = data;
        });
        return planet;
      })
    );
  }
  private getPlanetId(characterUrl: string): number {
    return parseInt(
      characterUrl.substring(swapiPlanetURL.length, characterUrl.length - 1),
      10
    );
  }
}
