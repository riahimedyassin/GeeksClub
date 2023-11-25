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
  toDisplay: Event[] = [];
  ended: boolean = false;
  categorie : string = 'all'
  searchValue : string = ""

  constructor(private eventService: EventsService) {}
  ngOnInit(): void {
    this.eventService.getAllEvenets().subscribe((response) => {
      this.events = response.data;
      this.toDisplay = response.data.filter(
        (event) => event.ended == this.ended
      );
    });
  }
  handleEndEvent(eventId: string) {
    this.eventService.endEvent(eventId).subscribe((response) => {
        this.applyFilter()
    });
  }
  handleSearch(event: any) {
    const value = (<HTMLInputElement>event.target).value;
    this.searchValue=value ; 
    this.applyFilter()
  }
  handleCategorie(event: any) {
    const value = (<HTMLSelectElement>event.target).value;
    this.categorie=value ; 
    this.applyFilter()
  }
  handelEnded() {
    this.ended = !this.ended;
    this.applyFilter()
  }
  trackBy(index: number, event: Event) {
    return event._id;
  }
  applyFilter() {
    this.toDisplay=this.events.filter(event=> {
      if(this.categorie==='all') {
        if(this.searchValue.trim()==='') return event.ended===this.ended
        return event.ended===this.ended && event.title.toLowerCase().includes(this.searchValue.toLowerCase())
      }
      else {
        if(this.searchValue.trim()==="") return event.ended===this.ended && event.categorie==this.categorie
        return event.ended===this.ended && event.title.toLowerCase().includes(this.searchValue.toLowerCase()) && event.categorie==this.categorie
      }
    })
  }
  handleDelete(id: string) {
    this.eventService.deleteEvent(id).subscribe((response) => {
      this.events = this.events.filter(event => event._id!=id)
      this.applyFilter()
    });
  }
}
