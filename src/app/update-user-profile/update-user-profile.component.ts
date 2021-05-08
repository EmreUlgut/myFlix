import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import {
  GetAllMoviesService,

  GetUserService,
  DeleteUserService,
  EditUserService
} from '../fetch-api-data.service';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})
export class UpdateUserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  movies: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiDataUser: GetUserService,

    public fetchApiDataDeleteUser: DeleteUserService,
    public fetchApiEditUser: EditUserService,
    public dialogRef: MatDialogRef<UpdateUserProfileComponent>,
    public snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  /**
* This function delete user information
*/
  deleteUser(): void {
    this.fetchApiDataDeleteUser.deleteUser().subscribe(() => {
      console.log('Profile deleted');
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackbar.open('Profile deleted', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
  * This function updates user information and refreshes the page
  */
  editUser(): void {
    this.fetchApiEditUser.editUser(this.userData).subscribe((response) => {
      // logic for a successful user edit goes here
      this.dialogRef.close(); // closes the modal on success
      // localStorage.setItem('user', response.Username);
      this.snackbar.open('Profile updated successfully!', 'OK', {
        duration: 2000,
      });
      localStorage.setItem('user', this.userData.Username);
      window.location.reload();
    }, (response) => {
      // localStorage.setItem('user', response.Username);
      console.log(response, '!!response');
      this.snackbar.open(response, 'OK', {
        duration: 2000,
      });
    })
  }
}