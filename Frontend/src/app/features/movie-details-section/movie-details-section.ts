import {ChangeDetectorRef, Component, OnInit , OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule, Location} from '@angular/common';
import {MovieDetails} from '../../shared/models/MovieDetails';
import {MovieService} from '../../core/services/movie-service';
import {takeUntil,Subject} from 'rxjs';
import Swal from 'sweetalert2';
import {FavoriteService} from '../../core/services/favorite-service';

@Component({
  selector: 'app-movie-details-section',
  imports: [CommonModule],
  templateUrl: './movie-details-section.html',
  styleUrl: './movie-details-section.css',
})
export class MovieDetailsSection implements OnInit {
  movie!:MovieDetails;
  isLoading: boolean = true;
  isFavorite: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router : Router,
              private favoriteService: FavoriteService,
              private movieService: MovieService,
              private cdRef: ChangeDetectorRef,
              private location:Location) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.movie = data;
          this.isLoading = false;
          this.cdRef.detectChanges();
        });

      this.checkFavoriteStatus(id);
    } else {
      this.isLoading = false;
    }
  }

  checkFavoriteStatus(movieId: string) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      this.favoriteService.getFavoriteIds()
        .pipe(takeUntil(this.destroy$))
        .subscribe(ids => {
          this.isFavorite = ids.includes(Number(movieId));
          this.cdRef.detectChanges();
        });
    }
  }

  addToFavorites(movie: any) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      Swal.fire({
        title: 'Login Required',
        text: 'You must be logged in to save favorite movies.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Sign In Now',
      }).then((result) => {
        if (result.isConfirmed) this.router.navigate(['/signin']);
      });
      return;
    }

    this.favoriteService.toggleFavorite(movie.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isFavorite = !this.isFavorite;
          // Success toasts stay simple and clean
          this.showToast(
            this.isFavorite ? 'Added to favorites' : 'Removed from favorites',
            this.isFavorite ? 'success' : 'info'
          );
          this.cdRef.detectChanges();
        },
        error: (err) => {
          // --- MATCHING THE BACKEND RESPONSE ---
          let errorMessage = 'Error updating favorites';

          if (err.error) {
            try {
              // If responseType was 'text', err.error is a string we must parse
              const body = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
              errorMessage = body.message || errorMessage;
            } catch (e) {
              // If it's not JSON, use the raw error string
              errorMessage = err.error;
            }
          }

          this.showToast(errorMessage, 'error');
        }
      });
  }

  private showToast(message: string, icon: any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  watchTrailer() {
    Swal.fire({
      title: 'Coming Soon!',
      text: 'We are currently working on fetching the best trailers for you. Stay tuned!',
      icon: 'info',
      confirmButtonText: 'Got it!'
    });
  }

  goBack(): void {
    this.location.back();
  }

}
