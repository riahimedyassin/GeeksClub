import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { ForumsService } from '../shared/services/forum/forums.service';
import { Event } from 'src/app/shared/models/Event.model';
import { Forum } from 'src/app/shared/models/Forum.model';
import { User } from 'src/app/shared/models/User.model';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  event!: Event;
  forums!: Forum[] ;
  user!: User;
  tier!: { title: string; icon: string };
  fetchedEvent : boolean = false 
  constructor(
    private eventsService: EventsService,
    private forumsService: ForumsService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.eventsService.getAllEvenets().subscribe((response) => {
      this.event = response.data[0];
      this.fetchedEvent=true 
    });
    this.userService.getCurrentUser().subscribe((response) => {
      this.user = response.data;
      this.tier = this.userService.getTier(
        <number>this.user.points?.global_point
      );
      if (this.user.forums) {
        this.forumsService.getUsersForums().subscribe((response) => {
          this.forums = response.data;
        });
      }
    },err=> console.log(err));
  }
}
