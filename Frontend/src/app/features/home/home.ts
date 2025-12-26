import { Component } from '@angular/core';
import {Header} from "../../layout/header/header";
import {HeroSection} from "../../shared/components/hero-section/hero-section";
import {MovieSection} from "../../shared/components/movie-section/movie-section";
import {ContactPage} from '../../layout/contact-page/contact-page';

@Component({
  selector: 'app-home',
  imports: [
    HeroSection,
    MovieSection,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
}
