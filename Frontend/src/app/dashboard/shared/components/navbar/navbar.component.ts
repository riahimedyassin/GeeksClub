import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    constructor(private userService : UserService, private router : Router) {}
    user! : User| null ;
    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((response)=> {
            this.user=response.data
        })
    }
    logout() {
      this.userService.logout()
      this.user=null; 
      this.router.navigate(['/login'])
    }

}
