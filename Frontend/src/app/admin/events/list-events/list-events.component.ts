import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { Event } from 'src/app/shared/models/Event.model';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss'],
})
export class ListEventsComponent implements OnInit {
  events!: Event[];
  toDisplay! : Event[] ; 
  ended : boolean = false 

  constructor(private eventService: EventsService) {}
  ngOnInit(): void {
    this.eventService.getAllEvenets().subscribe((response) => {
      this.events = response.data;
      this.toDisplay=response.data.filter(event => event.ended==this.ended)
    });
  }
  handleEndEvent(eventId: string) {
    this.eventService.endEvent(eventId).subscribe((response) => {
      response.status === 201 ? console.log('Done') : console.log('What ?');
    });
  }
  handleSearch(event : any) {
    const value = (<HTMLInputElement>event.target).value;
    if (value.trim() != '') {
      this.toDisplay = this.events.filter(
        (element) => element.title.toLowerCase().includes(value.toLowerCase())
      );
    }
    else {
      this.toDisplay=this.events
    }
  }
  handleCategorie(event : any ) {
    const value = (<HTMLSelectElement>event.target).value
    if(value==='all') {
      this.toDisplay=this.events
    }
    else {
      this.toDisplay=this.events.filter(event => event.categorie===value)
    }
  }
  handelEnded() {
    this.ended=!this.ended
    this.toDisplay=this.events.filter(event => event.ended==this.ended)
  }
}