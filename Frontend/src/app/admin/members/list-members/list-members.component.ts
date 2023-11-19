import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.scss'],
})
export class ListMembersComponent {
  constructor(
    private userService: UserService,
    private activated: ActivatedRoute
  ) {}
  members!: User[];
  toDisplay!: User[];
  search: string = '';
  registered!: User[];
  page: number = 1;
  listRegistered: boolean = false;
  ngOnInit(): void {
    this.userService.getAllMembers(this.page).subscribe((response) => {
      this.members = response.data;

      if (this.activated.snapshot.queryParamMap.get('registered') == 'true') {
        this.listRegistered = true;
      }
      this.toDisplay = response.data.filter(
        (memeber) => memeber.isMember == !this.listRegistered
      );
    });
    this.userService.getAllRegistered().subscribe((response) => {
      this.registered = response.data;
    });
  }
  handleSerch() {
    if (this.search.trim() === '')
      this.toDisplay = this.members.filter(
        (member) => member.isMember == !this.listRegistered
      );
    else {
      this.toDisplay = this.members.filter(
        (member) =>
          member.name.toLowerCase().includes(this.search.toLowerCase()) &&
          member.isMember == !this.listRegistered
      );
    }
  }
  dispalyRegisterd() {
    this.listRegistered = !this.listRegistered;
    this.toDisplay = this.listRegistered
      ? this.registered.filter((member) => member.name.toLowerCase().includes(this.search.toLowerCase()))
      : this.members.filter(member=> member.name.toLowerCase().includes(this.search.toLowerCase()));
  }
}
