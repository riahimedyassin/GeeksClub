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
        this.members = response.data;
        this.isDoneMember = response.done;
        if (this.activated.snapshot.queryParamMap.get('registered') == 'true') {
          this.listRegistered = true;
          this.userService.getAllRegistered().subscribe((response) => {
            this.toDisplay = response.data;
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
      }
    }
  }
  handleSerch(event : any) {
      const value = (<HTMLInputElement>event.target).value;
      this.search=value ;
      this.applyFilter()
  }
  dispalyRegisterd() {
    this.listRegistered = !this.listRegistered;
    this.applyFilter()
  }
  applyFilter() {
    if (this.search.trim() === '') {
      this.toDisplay = this.members.filter(
        (member) => member.isMember === !this.listRegistered
      );
    } else {
      this.toDisplay = this.members.filter(
        (member) =>
          member.name.toLowerCase().includes(this.search.toLowerCase()) &&
          member.isMember === !this.listRegistered
      );
    }
  }
}
