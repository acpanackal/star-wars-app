import { Router } from '@angular/router';
import { SwapiService, Planet, Film } from './../../swapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css'],
})
export class PlanetDetailsComponent implements OnInit {
  planet: Planet;
  planetId: number;
  characterId: number;
  divFullFilms: boolean = false;

  constructor(public swapiService: SwapiService, private router: Router) {}

  ngOnInit(): void {
    // this.character = this.swapiService.selectedCharacter;
    if (this.swapiService.selectedPlanet) {
      this.planet = this.swapiService.selectedPlanet;
    } else {
      this.planetId = +this.router.url.substring(
        this.router.url.length - 1,
        this.router.url.length
      );

      this.swapiService.getPlanet(this.planetId).subscribe((data) => {
        this.planet = data;
      });
    }
  }
  displayAllFilms() {
    this.divFullFilms = true;
  }
  showFilmDetails(film: Film) {
    console.log(film);
    this.characterId = film.id;
    this.swapiService.selectedFilm = film;
    this.router.navigate(['/films', film.id]);
  }
}
