import { Film, FilmsService } from '../films.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
})
export class FilmListComponent implements OnInit {
  listFilms: Film[];
  constructor(service: FilmsService) {
    service.getFilms().subscribe((data) => {
      this.listFilms = data;
    });
  }

  ngOnInit(): void {}
}
