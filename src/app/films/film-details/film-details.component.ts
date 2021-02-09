import { SwapiService } from './../../swapi.service';
import { Film } from '../../films/film';
import { Character } from '../../characters/character';
import { Planet } from '../../planet/planet';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from '../film.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
})
export class FilmDetailsComponent implements OnInit {
  film: Film;
  filmId: number;
  characterId: number;
  planetId: number;
  divFullCharcter = false;
  divFullPlanet = false;

  constructor(
    public filmService: FilmsService,
    private swapiService: SwapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.filmService.selectedFilm) {
      this.film = this.filmService.selectedFilm;
    } else {
      this.filmId = +this.router.url.substring(
        this.router.url.length - 1,
        this.router.url.length
      );
      this.filmService.getFilm(this.filmId).subscribe((data) => {
        this.film = data;
      });
    }
  }
  displayAllCharacters(): void {
    this.divFullCharcter = true;
  }
  displayAllPlanets(): void {
    this.divFullPlanet = true;
  }
  showCharacterDetails(character: Character): void {
    this.characterId = character.id;
    this.swapiService.selectedCharacter = character;
    this.router.navigate(['/characters', character.id]);
  }
  showPlanetDetails(planet: Planet): void {
    this.planetId = planet.id;
    this.swapiService.selectedPlanet = planet;
    this.router.navigate(['/planets', planet.id]);
  }
}
