import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../core/services/auth-service';
import Swal from 'sweetalert2';
import {ContactPage} from '../contact-page/contact-page';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public constructor(public authService: AuthService,public router: Router) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Professional Blue
      cancelButtonColor: '#d33',    // Danger Red
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Stay logged in',
      reverseButtons: true // Puts "Cancel" on the left, "Logout" on the right
    }).then((result) => {
      if (result.isConfirmed) {
        // 1. Perform the actual logout
        this.authService.logout();

        // 2. Show a quick success toast or message
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been safely logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/signin']);
        });
      }
    });
  }
}
