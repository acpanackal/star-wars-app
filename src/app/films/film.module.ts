import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmListComponent } from './film-list/film-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FilmListComponent, FilmDetailsComponent],
  imports: [CommonModule],
})
export class FilmModule {}
