import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Router, RouterLink} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../../../core/services/auth-service';
import Swal from 'sweetalert2';
import {ApiErrorResponse} from '../../../shared/models/ApiErrorResponse';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router,private location: Location,private authService: AuthService) {
  }

  onRegister(form: NgForm) {
    const registerData = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You can now log in to your account.',
          timer: 2000,
          showConfirmButton: false
        });
        form.reset();
      },
      error: (err) => {
        console.log("Raw Error:", err);

        let errorMessage = "Something went wrong on the server.";

        if (typeof err.error === 'string') {
          try {
            const parsed = JSON.parse(err.error);
            errorMessage = parsed.message;
          } catch (e) {
            errorMessage = err.error;
          }
        } else {
          // If it's already an object
          errorMessage = err.error?.message || "Error occurred";
        }
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage || 'Something went wrong on the server.',
        });
      }
    });
  }
  goToSignIn() {
    this.router.navigate(['/signin']);
  }
}

