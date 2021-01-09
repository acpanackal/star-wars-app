import { CharactersService, Character } from './../characters.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
  listCharacters: Character[];
  constructor(service: CharactersService) {
    service.getCharactersList().subscribe((data) => {
      this.listCharacters = data;
    });
  }

  ngOnInit(): void {}
}
