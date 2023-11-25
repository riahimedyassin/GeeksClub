import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activated: ActivatedRoute,
    private router: Router
  ) {}
  id!: string;
  user!: User;
  error: boolean = false; // Error Notification Trigger
  accepted!: boolean; // Notification Trigger
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.userService.getMemberDetails(this.id).subscribe((response) => {
      this.user = response.data;
      this.accepted = <boolean>response.data.isMember;
    });
  }
  handleDelete() {
    this.userService.deleteMember(this.id).subscribe(
      (response) => {
        this.router.navigateByUrl('/admin/members/list/1');
      },
      (err) => {
        this.error = true;
        setTimeout(() => (this.error = false), 3000);
      }
    );
  }
  acceptMember() {
    this.userService.registerMember(this.id).subscribe((response) => {
      this.accepted = true;
    });
  }
}
