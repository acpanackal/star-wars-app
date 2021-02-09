import { PlanetService } from './../planet.service';
import { Router } from '@angular/router';
import { Planet } from '../../planet/planet';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css'],
})
export class PlanetListComponent implements OnInit {
  listPlanets: Planet[];
  planetId: number;

  constructor(private service: PlanetService, private router: Router) {}

  ngOnInit(): void {
    this.service.getPlanets().subscribe((data) => {
      this.listPlanets = data;
    });
  }
  planetDetails(planet: Planet): void {
    this.planetId = planet.id;
    this.service.selectedPlanet = planet;
    this.router.navigate(['/planets', planet.id]);
  }
}
