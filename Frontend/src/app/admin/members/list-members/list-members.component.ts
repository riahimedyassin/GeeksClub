import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activated: ActivatedRoute,
    private router: Router
  ) {}
  members!: User[];
  toDisplay!: User[];
  search: string = '';
  page!: string;
  listRegistered: boolean = false;
  isDoneMember!: boolean;
  ngOnInit(): void {
    this.activated.paramMap.subscribe((data) => {
      this.page = <string>data.get('page');

      this.userService.getAllMembers(this.page).subscribe((response: any) => {
        console.log(response);
        this.members = response.data;
        this.isDoneMember = response.done;

        if (this.activated.snapshot.queryParamMap.get('registered') == 'true') {
          this.listRegistered = true;
          this.userService.getAllRegistered().subscribe((response) => {
            this.toDisplay=this.members.filter(member => member.isMember==false)
          });
        } else {
          this.toDisplay = response.data.filter(
            (memeber: any) => memeber.isMember == true 
          );
        }
      });
    });
  }
  handlePage(type: 'min' | 'plus') {
    if (type === 'min' && Number(this.page) > 0) {
      this.page = `${Number(this.page) - 1}`;
      this.router.navigate(['/admin/members/list/' + this.page]);
    } else {
      if (!this.isDoneMember) {
        this.page = `${Number(this.page) + 1}`;
        this.router.navigate(['/admin/members/list/' + this.page]);
      } else {
        console.log('done pages');
      }
    }
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
      ? this.members.filter((member) =>
          member.name.toLowerCase().includes(this.search.toLowerCase())  && member.isMember===false 
        )
      : this.members.filter((member) =>
          member.name.toLowerCase().includes(this.search.toLowerCase())
        );
  }
}
