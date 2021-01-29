import { Character } from '../characters/character';
import { Film } from '../films/film';
export class Planet {
  id: number;
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  filmsData: Film[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  residentsData: Character[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
  imageUrl: string;
}
