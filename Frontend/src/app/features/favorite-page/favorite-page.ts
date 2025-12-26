import { Component } from '@angular/core';
import {MovieSection} from '../../shared/components/movie-section/movie-section';
import {Header} from '../../layout/header/header';

@Component({
  selector: 'app-favorite-page',
  imports: [
    MovieSection
  ],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.css',
})
export class FavoritePage {

}
