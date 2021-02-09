import { imageGlobalPlanets, defaultImage } from './../dummy-image-urls';
import { Planet } from './planet';
import { SwapiService, ListResponse, swapiPlanetURL } from './../swapi.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  planetsList: Planet[];
  selectedPlanet: Planet;

  constructor(
    private httpClient: HttpClient,
    private swapiService: SwapiService,
    public datepipe: DatePipe
  ) {}

  getPlanets(): Observable<Planet[]> {
    if (this.planetsList) {
      return of(this.planetsList);
    } else {
      return this.httpClient.get<ListResponse<Planet>>(swapiPlanetURL).pipe(
        map((data) =>
          data.results.map((planet) => {
            planet.id = this.swapiService.getPlanetId(planet.url);
            for (const img of imageGlobalPlanets) {
              if (img.name === planet.name) {
                planet.imageUrl = img.url;
              }
            }
            if (!planet.imageUrl) {
              planet.imageUrl = defaultImage;
            }
            this.swapiService
              .getFilmsByPlanet(planet)
              .subscribe((filmsPlanet) => {
                planet.filmsData = filmsPlanet;
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
        planet.id = this.swapiService.getPlanetId(planet.url);
        for (const img of imageGlobalPlanets) {
          if (img.name === planet.name) {
            planet.imageUrl = img.url;
          }
        }
        if (!planet.imageUrl) {
          planet.imageUrl = defaultImage;
        }
        this.swapiService.getFilmsByPlanet(planet).subscribe((data) => {
          planet.filmsData = data;
        });
        return planet;
      })
    );
  }
}
