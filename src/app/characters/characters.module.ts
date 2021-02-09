import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CharacterDetailsComponent, CharacterListComponent],
  imports: [CommonModule],
})
export class CharactersModule {}
