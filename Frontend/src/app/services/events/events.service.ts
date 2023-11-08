import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/shared/models/Event.model';
import { Response } from 'src/app/shared/models/Response.model';
import { environment } from 'src/env/env';

const URL = `${environment.host}/events`;

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient ) {}

  getAllEvenets(): Observable<Response<Event[]>> {
    return this.http.get<Response<Event[]>>(URL);
  }
}
