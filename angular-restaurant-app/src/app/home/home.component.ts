import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../users/user';
import { UserService } from '../users/user.service';
import { AuthenticationService } from '../auth/authentication.service';

/**
  The home component defines an angular 8 component that gets all users from the user service and makes them available to the template via a users array property.
*/

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getUser().pipe(first()).subscribe(user => {
      this.loading = false;
      this.user = user;
    });
  }
}
