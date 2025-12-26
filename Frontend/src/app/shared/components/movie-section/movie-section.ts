import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MovieCard} from '../movie-card/movie-card';
import {CommonModule} from '@angular/common';
import {MovieCardDTO} from '../../models/MovieCardDTO';
import {MovieService} from '../../../core/services/movie-service';
import {Router, RouterLink} from '@angular/router';
import {forkJoin, map} from 'rxjs';
import {FavoriteService} from '../../../core/services/favorite-service';

@Component({
  selector: 'app-movie-section',
  standalone: true,
  imports: [MovieCard, CommonModule, RouterLink],
  templateUrl: './movie-section.html',
  styleUrl: './movie-section.css',
})
export class MovieSection implements OnInit {
  @Input() category!: string;
  title!: string;
  isShowing:boolean = false;
  isLoading = true;
  timeoutId: any;
  movies: MovieCardDTO[] = [];
  currentRoute!: string;

  public constructor(private movieService:MovieService,
                     private favoriteService: FavoriteService,
                     private cdr: ChangeDetectorRef,
                     private router: Router) {
  }
  ngOnInit() {
    this.startTimeout();
    if(this.category) {
      this.fetchMoviesByCategory(this.category);
    }
  }

  startTimeout() {
    this.timeoutId = setTimeout(() => {
      if (this.movies.length === 0) {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    }, 10000);
  }
  fetchMoviesByCategory(category: string): void {
    this.currentRoute=this.router.url;
    this.isShowing = !this.currentRoute.startsWith('/all-movies/') && this.currentRoute !== '/favorites';

    if(category==="popular"){
      this.title="Popular Movies";
      this.movieService.getPopularMovies().subscribe(data=>{
        this.movies= this.isShowing ? data.slice(0, 4) : data ;
        this.cdr.detectChanges();
        clearTimeout(this.timeoutId);
      })
    }else if(category==="top"){
      this.title="Top Rated Movies";
      this.movieService.getTopRatedMovies().subscribe(data=>{
        this.movies=this.isShowing ? data.slice(0, 4) : data ;
        this.cdr.detectChanges();
        clearTimeout(this.timeoutId);
      })

    }else if(category==="upcoming"){
      this.title="Upcoming Movies";
      this.movieService.getUpcomingMovies().subscribe(data=>{
        this.movies=this.isShowing ? data.slice(0, 4) : data ;
        this.cdr.detectChanges();
        clearTimeout(this.timeoutId);
      })
    }else if (category === "favorites") {
      this.title = "My Favorite Movies";

      this.favoriteService.getFavoriteIds().subscribe(ids => {
        if (!ids || ids.length === 0) {
          this.movies = [];
          this.isLoading = false;
          this.cdr.detectChanges();
          return;
        }

        const movieRequests = ids.map(id => this.movieService.getMovieById(id.toString()));

        forkJoin(movieRequests).subscribe(movieDataArray => {
          this.movies = movieDataArray.map(m => {
            return {
              id: m.id.toString(),
              originalTitle: m.originalTitle || m.originalTitle ,
              releaseYear: m.releaseYear ? m.releaseYear.split('-')[0] : '',
              poster_path: m.poster_path
            } as MovieCardDTO;
          });
          this.cdr.detectChanges();
          clearTimeout(this.timeoutId);
        });
      });
    }else{
      this.title="Search results for :"+category;
      this.movieService.getMovieByQuery(category).pipe(
        map(data => {
          const filteredMovies = data.filter(movie => {
            return !!movie.poster_path;
          });
          return filteredMovies;
        })
      )
        .subscribe(filteredData => {
          const finalMovies = filteredData;
          this.movies = finalMovies;
          this.cdr.detectChanges();
        }, error => {
          console.error('Error fetching movies:', error);
        });
    }
  }

  onViewAll(): void {
    this.router.navigate(['/all-movies/', this.category]);
  }

}
