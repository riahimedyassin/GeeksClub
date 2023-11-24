import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { Event } from 'src/app/shared/models/Event.model';
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss'],
})
export class ListEventsComponent {
  events!: Event[];
  allEvents!: Event[];
  toDisplay!: Event[];
  searchValue: string = '';
  categorie: string = 'all';
  listParticipation: boolean = false;

  constructor(
    private eventService: EventsService,
    private reveal: RevealAnimationService
  ) {}
  ngOnInit(): void {
    this.reveal.initScrollReveal('bottom', 1000, 'reveal');
    this.eventService.getUsersEvents().subscribe((response) => {
      this.events = response.data;
    });
    this.eventService.getAllEvenets().subscribe((response) => {
      this.allEvents = response.data;
      this.toDisplay = response.data;
    });
  }
  handleSearch(event: any) {
    const value = (<HTMLInputElement>event.target).value;
    this.searchValue = value;
    this.applyFilter();
  }
  handleCategorie(event: any) {
    const value = (<HTMLInputElement>event.target).value;
    this.categorie = value;
    this.applyFilter();
  }
  applyFilter() {
    this.toDisplay = this.allEvents.filter((event) => {
      if (this.categorie === 'all')
        return event.title
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      return (
        event.title.toLowerCase().includes(this.searchValue.toLowerCase()) &&
        event.categorie === this.categorie
      );
    });
  }
}
