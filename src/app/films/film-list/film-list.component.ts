import { SwapiService } from '../../swapi.service';
import { Film } from '../../films/film';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
})
export class FilmListComponent implements OnInit {
  @Input() films: Film[];
  listFilms: Film[];
  filmId: Number;

  constructor(private service: SwapiService, private router: Router) {
    service.getFilms().subscribe((data) => {
      this.listFilms = data;
    });
  }

  ngOnInit(): void {}

  filmDetails(film: Film) {
    this.filmId = film.id;
    this.service.selectedFilm = film;
    this.router.navigate(['/films', film.id]);
  }
}
