import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { EventsService } from 'src/app/services/events/events.service';
import { Event } from 'src/app/shared/models/Event.model';
import { User } from 'src/app/shared/models/User.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  event!: Event;
  participants!: User[];
  id!: string;
  constructor(
    private eventService: EventsService,
    private activated: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.eventService.getSingleEvent(this.id).subscribe((response) => {
      this.event = response.data;
      this.eventService.getParticipants(this.id).subscribe((response) => {
        console.log(response);
        this.participants = response.data;
      });
    });
  }
  confirmParticipation(userID: string) {
    this.eventService
      .confirmParticipation(this.id, userID)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
