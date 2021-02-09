import { PlanetListComponent } from './planet-list/planet-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';

@NgModule({
  declarations: [PlanetListComponent, PlanetDetailsComponent],
  imports: [CommonModule],
})
export class PlanetModule {}
