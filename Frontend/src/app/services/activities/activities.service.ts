import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/models/Response.model';
import { environment } from 'src/env/env';
import { Event } from 'src/app/shared/models/Event.model';


const URL = `${environment.host}/events`


@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http : HttpClient) { }

  getFeaturedActivites () : Observable<Response<Event[]>> {
    return this.http.get<Response<Event[]>>(`${URL}/featured`)
  }




}
