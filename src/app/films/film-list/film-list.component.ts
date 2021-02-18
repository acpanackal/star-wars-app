import { FilmsService } from './../film.service';
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
  filmId: number;

  constructor(private service: FilmsService, private router: Router) {}

  ngOnInit(): void {
    this.service.getFilms().subscribe((data) => {
      this.listFilms = data;
    });
  }

  filmDetails(film: Film): void {
    this.filmId = film.id;
    this.service.selectedFilm = film;
    this.router.navigate(['/films', film.id]);
  }

  newFilm(): void {
    this.router.navigate(['/newFilm']);
  }
}
