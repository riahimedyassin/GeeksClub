import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activated: ActivatedRoute
  ) {}
  id!: string;
  user!: User;
  displayNotification: boolean = false;
  error : boolean = false  ;
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.userService.getMemberDetails(this.id).subscribe((response) => {
      this.user = response.data;
    });
  }
  handleDelete() {
    if (!this.displayNotification) this.displayNotification = true;
    else {
      this.userService.deleteMember(this.id).subscribe((response) => {
        console.log("Deleted succussfully")
      },(err)=> {

      });
    }
  }
  acceptMember() {
    this.userService.registerMember(this.id).subscribe(response=> {
      
    })
  }
}