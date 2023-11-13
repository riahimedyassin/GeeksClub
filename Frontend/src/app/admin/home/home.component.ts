import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { ForumsService } from 'src/app/dashboard/shared/services/forum/forums.service';
import { EventsService } from 'src/app/services/events/events.service';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Admin } from 'src/app/shared/models/Admin.model';
import { Forum } from 'src/app/shared/models/Forum.model';
import { Event } from 'src/app/shared/models/Event.model';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private forumsService: ForumsService,
    private eventService: EventsService,
    private userService: UserService
  ) {}
  admin!: Admin;
  forums!: Forum[];
  events!: Event[];
  members!: User[];
  isLoading: boolean = true;
  ngOnInit(): void {
    this.adminService.getCurrentAdmin().subscribe((response) => {
      this.admin = response.data;
      this.forumsService.getAllForums().subscribe((response) => {
        this.forums = response.data;
        this.eventService.getAllEvenets().subscribe((response) => {
          this.events = response.data;
          this.userService.getAllMembers(1).subscribe((response) => {
            this.members = response.data;
            this.isLoading = false;
          });
        });
      });
    });
  }
}
