import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Header} from '../../layout/header/header';
import {MovieSection} from '../../shared/components/movie-section/movie-section';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-all-movies',
  imports: [
    MovieSection
  ],
  templateUrl: './all-movies.html',
  styleUrl: './all-movies.css',
})
export class AllMovies implements OnInit {
  category!: string ;

  constructor(private route:ActivatedRoute) {
  }
  ngOnInit() {
    this.category=this.route.snapshot.params['category'];

  }


}
