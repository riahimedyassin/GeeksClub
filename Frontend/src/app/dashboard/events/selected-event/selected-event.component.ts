import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import { Comment } from 'src/app/shared/models/Comment.model';
import { Event } from 'src/app/shared/models/Event.model';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-selected-event',
  templateUrl: './selected-event.component.html',
  styleUrls: ['./selected-event.component.scss'],
})
export class SelectedEventComponent implements OnInit {
  constructor(
    private activated: ActivatedRoute,
    private eventService: EventsService,
    private userService: UserService
  ) {}
  id!: string;
  event!: Event;
  comment!: string;
  error: boolean = false;
  member!: boolean;
  user_id!: string;
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.eventService.getSingleEvent(this.id).subscribe(
      (response) => {
        this.event = response.data;
        this.userService.getCurrentUser().subscribe((response) => {
          this.user_id = response.data._id;
          this.member =
            this.event.participants.filter(
              (participant) => participant.user_id === response.data._id
            ).length > 0;
          console.log(this.member);
        });
      },
      (err) => {
        this.error = true;
      }
    );
  }
  handleComment() {
    console.log(this.id);
    this.eventService.addComment(this.comment, this.id).subscribe(
      (response) => {
        this.comment = '';
        this.event = response.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  handleParticipate() {
    this.eventService.participateToEvent(this.id).subscribe(
      () => {
        this.member = true;
        this.event.participants.push({
          user_id: this.user_id,
          participated: false,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  handleQuitEvent() {
    this.eventService.quitEvent(this.id).subscribe(
      (response) => {
        this.event = response.data;
        this.member = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
