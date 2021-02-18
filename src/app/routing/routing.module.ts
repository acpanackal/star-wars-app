import { NewFilmComponent } from './../films/new-film/new-film.component';
import { PlanetListComponent } from './../planet/planet-list/planet-list.component';
import { HomeComponent } from './../home/home.component';
import { CharacterDetailsComponent } from './../characters/character-details/character-details.component';
import { FilmDetailsComponent } from './../films/film-details/film-details.component';
import { CharacterListComponent } from './../characters/character-list/character-list.component';
import { FilmListComponent } from './../films/film-list/film-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { PlanetDetailsComponent } from '../planet/planet-details/planet-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  {
    path: 'films',
    component: FilmListComponent,
    pathMatch: 'full',
  },
  {
    path: 'characters',
    component: CharacterListComponent,
    pathMatch: 'full',
  },
  {
    path: 'planets',
    component: PlanetListComponent,
    pathMatch: 'full',
  },
  { path: 'films/:filmId', component: FilmDetailsComponent, pathMatch: 'full' },
  {
    path: 'characters/:characterId',
    component: CharacterDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'planets/:planetId',
    component: PlanetDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'newFilm',
    component: NewFilmComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
