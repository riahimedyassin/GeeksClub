import { Component } from '@angular/core';
import { ForumsService } from '../../shared/services/forum/forums.service';
import { UserService } from '../../shared/services/user/user.service';
import { Forum } from 'src/app/shared/models/Forum.model';

@Component({
  selector: 'app-list-forums',
  templateUrl: './list-forums.component.html',
  styleUrls: ['./list-forums.component.scss'],
})
export class ListForumsComponent {
  type!: 'user' | 'all';
  error: boolean = false;
  forums!: Forum[];
  subscribedForums: Forum[] = [];
  constructor(
    private forumService: ForumsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.type = 'all';
    this.forumService.getAllForums().subscribe((response) => {
      this.forums = response.data;
      this.userService.getCurrentUser().subscribe((response) => {
        this.subscribedForums = this.forums.filter((element) =>
          element.members.includes(response.data._id)
        );
      });
    });
  }
}
