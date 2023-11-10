import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { EventsService } from 'src/app/services/events/events.service';
import { Event as Events } from 'src/app/shared/models/Event.model';
import { Forum } from 'src/app/shared/models/Forum.model';
import { ForumsService } from '../../../services/forum/forums.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private eventService: EventsService,
    private forumService: ForumsService
  ) {}
  selected: string = 'events';
  events!: Events[];
  forums!: Forum[];
  toDisplay!: any;
  searchValue!: Subject<string>;
  isEmpty: boolean = true;
  hide: boolean = true;
  ngOnInit(): void {
    this.searchValue = new Subject<string>();
    this.eventService.getAllEvenets().subscribe(
      (res) => {
        this.events = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.forumService.getAllForums().subscribe(
      (res) => {
        this.forums = res.data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.searchValue.pipe(debounceTime(500)).subscribe((data) => {
      if (data.length === 0) this.isEmpty = true;
      else {
        this.isEmpty = false;
        if (this.selected === 'events') {
          this.toDisplay = this.events.filter((element) =>
            element.title.toLowerCase().includes(data.toLowerCase())
          );
        } else {
          this.toDisplay = this.forums.filter((element) =>
            element.name.toLowerCase().startsWith(data.toLowerCase())
          );
        }
      }
    });
  }
  bindSearchType(event: any) {
    this.selected = (<HTMLSelectElement>event.target).value;
  }
  handleSearch(event: any) {
    this.searchValue.next((<HTMLInputElement>event.target).value);
  }
}
