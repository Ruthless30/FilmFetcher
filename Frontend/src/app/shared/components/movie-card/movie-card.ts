import {Component, Input} from '@angular/core';
import {MovieCardDTO} from '../../models/MovieCardDTO';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input() movie!:MovieCardDTO

  onCardClick() {
    console.log('Product clicked:', this.movie);
  }

}
