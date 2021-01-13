import { RoutingModule } from './routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilmListComponent } from './films/film-list/film-list.component';
import { FilmDetailsComponent } from './films/film-details/film-details.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CharacterListComponent } from './characters/character-list/character-list.component';
import { CharacterDetailsComponent } from './characters/character-details/character-details.component';
import { HomeComponent } from './home/home.component';
import { DatePipe } from '@angular/common';
import { PlanetListComponent } from './planet/planet-list/planet-list.component';
import { PlanetDetailsComponent } from './planet/planet-details/planet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    FilmDetailsComponent,
    CharacterListComponent,
    CharacterDetailsComponent,
    HomeComponent,
    PlanetListComponent,
    PlanetDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    RoutingModule,
    MatToolbarModule,
    MatGridListModule,
    MatDividerModule,
    MatButtonModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
