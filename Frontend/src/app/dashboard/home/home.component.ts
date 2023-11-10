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
  forums: Forum[] = [];
  user!: User;
  tier!: { title: string; icon: string };
  constructor(
    private eventsService: EventsService,
    private forumsService: ForumsService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.eventsService.getAllEvenets().subscribe((response) => {
      this.event = response.data[0];
    });
    this.userService.getCurrentUser().subscribe((response) => {
      this.user = response.data;
      this.handleTier();
      const userForums = this.user.forums;
      console.log(this.user)
      if (userForums) {
        this.forumsService.getUsersForums().subscribe((response) => {
          console.log(response.data)
          response.data.forEach((forum) => {
            this.forumsService.getSingleForum(forum).subscribe((response) => {
              this.forums.push(response.data);
            },err=> console.log(err));
          });
        },err=> console.log(err));
      }
    },err=>console.log(err));
  }
  handleTier() {
    const points = this.user.points?.global_point;
    if (typeof points == 'number') {
      if (points < 10)
        this.tier = { title: 'Hydrogene (Starter)', icon: 'bot' };
      if (points > 10 && points < 50)
        this.tier = { title: 'Growing star', icon: 'star-half' };
      if (points > 50 && points < 100)
        this.tier = { title: 'Shiny star', icon: 'asterisk' };
      if (points > 100 && points < 200)
        this.tier = { title: 'Brilliant star', icon: 'star' };
      if (points > 200) this.tier = { title: 'Supernova', icon: 'asterisk' };
    }
  }
}
