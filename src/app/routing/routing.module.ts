import { CharacterListComponent } from './../characters/character-list/character-list.component';
import { FilmListComponent } from './../films/film-list/film-list.component';
import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: AppComponent },
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
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
