import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventsService } from 'src/app/services/events/events.service';
import { Event } from 'src/app/shared/models/Event.model';
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events!: Event[];
  allEvents!: Event[];
  toDisplay!: Event[];
  searchValue: string = '';

  constructor(
    private eventService: EventsService,
    private reveal: RevealAnimationService
  ) {}
  ngOnInit(): void {
    this.reveal.initScrollReveal('bottom', 1000, 'reveal');
    this.eventService.getUsersEvents().subscribe(
      (response) => {
        this.events = response.data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.eventService.getAllEvenets().subscribe((response) => {
      this.allEvents = response.data;
      this.toDisplay = response.data;
    });
  }
  handleSearch(event: any) {
    const value = (<HTMLInputElement>event.target).value;
    if (value.trim() != '') {
      this.toDisplay = this.allEvents.filter(
        (element) => element.title.toLowerCase().includes(value.toLowerCase())
      );
    }
    else {
      this.toDisplay=this.allEvents
    }
  }
  handleCategorie(event :any ) {
      const value = (<HTMLInputElement>event.target).value;
      if(value==="all") {
        this.toDisplay=this.allEvents ;
      }
      else {
        this.toDisplay=this.allEvents.filter(element=> element.categorie===value)
      }
  }
}
