import { Component, signal } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Header} from './layout/header/header';
import { FormsModule } from '@angular/forms';
import {ContactPage} from './layout/contact-page/contact-page';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',

  imports: [FormsModule, RouterOutlet, Header, ContactPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Film Fetcher');
  showLayout = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;

      const isHiddenPage = url.startsWith('/movie-details/') ||
        url === '/signin' ||
        url === '/signup';

      this.showLayout = !isHiddenPage;
    });
  }

}
