import { Character } from '../characters/character';
import { Planet } from '../planet/planet';
export class Film {
  id: number;
  title: string;
  episodeId: number;
  openingcrawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  charactersData: Character[];
  planets: string[];
  planetsData: Planet[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
  imageUrl: string;
}
