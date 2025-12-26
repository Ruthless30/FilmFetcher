import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSection } from './movie-section';

describe('MovieSection', () => {
  let component: MovieSection;
  let fixture: ComponentFixture<MovieSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
