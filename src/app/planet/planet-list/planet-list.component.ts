import { Router } from '@angular/router';
import { SwapiService, Planet } from './../../swapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css'],
})
export class PlanetListComponent implements OnInit {
  listPlanets: Planet[];
  planetId: Number;

  constructor(private service: SwapiService, private router: Router) {
    service.getPlanets().subscribe((data) => {
      this.listPlanets = data;
    });
  }

  ngOnInit(): void {}
  planetDetails(planet: Planet) {
    this.planetId = planet.id;
    this.service.selectedPlanet = planet;
    this.router.navigate(['/planets', planet.id]);
  }
}
