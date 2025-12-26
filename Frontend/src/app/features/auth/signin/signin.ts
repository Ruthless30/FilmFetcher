import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import {AuthService} from '../../../core/services/auth-service';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  // Model bindings for [(ngModel)]
  username = '';
  password = '';
  rememberMe = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSignIn(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // 1. Send as a clean JSON object, not FormData
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);

        Swal.fire({
          icon: 'success',
          title: 'Welcome back!',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        console.error('Login error', err);

        let errorMessage = 'Could not connect to the server.';

        if (err.error) {
          try {
            const body = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
            errorMessage = body.message || errorMessage;
          } catch (e) {
            errorMessage = err.error; // Fallback to raw string
          }
        }

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage
        });
      }
    });
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  forgotPassword() {
    Swal.fire('Forgot Password?', 'Feature coming soon! Please contact support.', 'info');
  }

  private showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: message
    });
  }
}
