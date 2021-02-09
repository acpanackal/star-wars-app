import { CharacterService } from './../character.service';
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
  characterId: number;

  constructor(private service: CharacterService, private router: Router) {}

  ngOnInit(): void {
    this.service.getCharactersList().subscribe((data) => {
      this.listCharacters = data;
    });
  }

  characterDetails(character: Character): void {
    // console.log(character);
    this.characterId = character.id;
    this.service.selectedCharacter = character;
    this.router.navigate(['/characters', character.id]);
  }
}
