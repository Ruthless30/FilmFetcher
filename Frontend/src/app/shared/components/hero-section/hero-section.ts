import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [FormsModule,RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  searchQuery: string = '';
  constructor(private route: Router) { }
  onSearch() {
    console.log('Searching for:', this.searchQuery);
    this.route.navigate(['/all-movies/', this.searchQuery]);
  }

}
