import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import { Comment } from 'src/app/shared/models/Comment.model';
import { Event } from 'src/app/shared/models/Event.model';

@Component({
  selector: 'app-selected-event',
  templateUrl: './selected-event.component.html',
  styleUrls: ['./selected-event.component.scss']
})
export class SelectedEventComponent implements OnInit {
  constructor(private activated :ActivatedRoute,private eventService : EventsService) {}
  id! : string ; 
  event! : Event; 
  comment! : string ; 
  error : boolean = false ; 
  ngOnInit(): void {
      this.id=<string>this.activated.snapshot.paramMap.get('id'); 
      this.eventService.getSingleEvent(this.id).subscribe((response)=> {
          this.event=response.data; 
      },(err)=> {
        this.error = true ; 
      })
  }
  handleComment() {
      this.eventService.addComment(this.comment,this.id).subscribe((response)=> {
        console.log(response)
      },err=> {
        console.log(err)
      })
  }
}
