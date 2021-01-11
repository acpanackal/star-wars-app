import { SwapiService, Character, Film } from '../../swapi.service';
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
  divFullFilms: boolean = false;

  constructor(public swapiService: SwapiService, private router: Router) {}

  ngOnInit(): void {
    // this.character = this.swapiService.selectedCharacter;
    if (this.swapiService.selectedCharacter) {
      this.character = this.swapiService.selectedCharacter;
    } else {
      this.characterId = +this.router.url.substring(
        this.router.url.length - 1,
        this.router.url.length
      );
      // console.log(this.characterId);
      this.swapiService.getCharacter(this.characterId).subscribe((data) => {
        this.character = data;
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
