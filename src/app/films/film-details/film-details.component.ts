import { SwapiService, Film, Character } from '../../swapi.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
})
export class FilmDetailsComponent implements OnInit {
  film: Film;
  filmId: number;
  characterId: number;
  divFullCharcter: boolean = false;

  constructor(public swapiService: SwapiService, private router: Router) {}

  ngOnInit() {
    if (this.swapiService.selectedFilm) {
      this.film = this.swapiService.selectedFilm;
    } else {
      this.filmId = +this.router.url.substring(
        this.router.url.length - 1,
        this.router.url.length
      );
      this.swapiService.getFilm(this.filmId).subscribe((data) => {
        this.film = data;
      });
    }
  }
  displayAllCharacters() {
    this.divFullCharcter = true;
  }
  showCharacterDetails(character: Character) {
    //console.log(character);
    this.characterId = character.id;
    this.swapiService.selectedCharacter = character;
    this.router.navigate(['/characters', character.id]);
  }
}
