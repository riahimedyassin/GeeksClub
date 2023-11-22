import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';

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
  accepted! : boolean  ; 
  deleted : boolean = false ; 
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.userService.getMemberDetails(this.id).subscribe((response) => {
      this.user = response.data;
      this.accepted=<boolean>response.data.isMember
    });
  }
  handleDelete() {
    if (!this.displayNotification) this.displayNotification = true;
    else {
      this.userService.deleteMember(this.id).subscribe((response) => {
          this.deleted=true ;
      },(err)=> {

      });
    }
  }
  acceptMember() {
    this.userService.registerMember(this.id).subscribe(response=> {
      this.accepted=true ; 
    })
  }
  
}
