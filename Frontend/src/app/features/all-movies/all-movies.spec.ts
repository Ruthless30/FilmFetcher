import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMovies } from './all-movies';

describe('AllMovies', () => {
  let component: AllMovies;
  let fixture: ComponentFixture<AllMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMovies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
