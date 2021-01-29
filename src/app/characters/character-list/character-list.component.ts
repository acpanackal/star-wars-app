import { SwapiService } from '../../swapi.service';
import { Character } from '../character';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
  @Input() characters: Character[];
  listCharacters: Character[];
  characterId: Number;

  constructor(private service: SwapiService, private router: Router) {
    service.getCharactersList().subscribe((data) => {
      this.listCharacters = data;
    });
  }

  ngOnInit(): void {}

  characterDetails(character: Character) {
    //console.log(character);
    this.characterId = character.id;
    this.service.selectedCharacter = character;
    this.router.navigate(['/characters', character.id]);
  }
}
