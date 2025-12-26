import { Routes } from '@angular/router';
import {Signin} from './features/auth/signin/signin';
import {Home} from './features/home/home';
import {Signup} from './features/auth/signup/signup';
import {MovieDetailsSection} from './features/movie-details-section/movie-details-section';
import {AllMovies} from './features/all-movies/all-movies';
import {NotFound} from './features/not-found/not-found';
import {FavoritePage} from './features/favorite-page/favorite-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'signin', component: Signin },
  { path: 'signup', component: Signup },
  { path: 'favorites', component: FavoritePage },
  { path: 'movie-details/:id', component: MovieDetailsSection },
  { path: 'all-movies/:category', component: AllMovies },
  { path: '**', component: NotFound },
];
