import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
   user! :User ;
   constructor(private userService : UserService) {
   }
   ngOnInit(): void {
       this.userService.getCurrentUser().subscribe(response=> {
            this.user=response.data
       })
   }

}
