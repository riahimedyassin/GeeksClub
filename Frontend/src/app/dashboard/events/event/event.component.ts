import { Component, Input } from '@angular/core';
import { Event } from 'src/app/shared/models/Event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
   @Input('event') event! : Event ; 
}
