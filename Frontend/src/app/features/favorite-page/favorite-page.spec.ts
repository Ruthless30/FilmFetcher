import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePage } from './favorite-page';

describe('FavoritePage', () => {
  let component: FavoritePage;
  let fixture: ComponentFixture<FavoritePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
