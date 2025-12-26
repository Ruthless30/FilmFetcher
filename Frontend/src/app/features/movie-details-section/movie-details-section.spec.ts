import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsSection } from './movie-details-section';

describe('MovieDetailsSection', () => {
  let component: MovieDetailsSection;
  let fixture: ComponentFixture<MovieDetailsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
