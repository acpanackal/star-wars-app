import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFilmComponent } from './new-film.component';

describe('NewFilmComponent', () => {
  let component: NewFilmComponent;
  let fixture: ComponentFixture<NewFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFilmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
