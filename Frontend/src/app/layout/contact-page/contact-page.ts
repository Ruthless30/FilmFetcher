import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-contact-page',
  imports: [RouterLink,CommonModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' }
  ];

  quickLinks = [
    { name: 'Home', route: '/home' },
    { name: 'Popular', route: '/all-movies/popular' },
    { name: 'Top Rated', route: '/all-movies/top' },
    { name: 'Favorites', route: '/favorites' }
  ];

  contactInfo = {
    email: 'contact@moviefetcher.com',
    phone: '+1 (555) 123-4567',
    address: '123 Luxury Avenue, Suite 100, New York, NY 10001'
  };

  onSubscribe(email: string) {
    console.log('Newsletter subscription:', email);
    // Add newsletter subscription logic
  }

  onSocialClick(platform: string) {
    console.log('Social link clicked:', platform);
  }
}
