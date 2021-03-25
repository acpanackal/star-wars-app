import { CharacterService } from './../character.service';
import { SwapiService } from '../../swapi.service';
import { Film } from '../../films/film';
import { Character } from '../character';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css'],
})
export class CharacterDetailsComponent implements OnInit {
  character: Character;
  filmId: number;
  characterId: number;
  divFullFilms = false;

  constructor(
    public swapiService: SwapiService,
    private router: Router,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    if (this.swapiService.selectedCharacter) {
      this.character = this.swapiService.selectedCharacter;
    } else {
      this.characterId = +this.router.url.substring(
        this.router.url.length - 1,
        this.router.url.length
      );
      this.characterService.getCharacter(this.characterId).subscribe((data) => {
        this.character = data;
      });
    }
  }
  displayAllFilms(): void {
    this.divFullFilms = true;
  }
  showFilmDetails(film: Film): void {
    console.log(film);
    this.characterId = film.id;
    this.swapiService.selectedFilm = film;
    this.router.navigate(['/films', film.id]);
  }
}
