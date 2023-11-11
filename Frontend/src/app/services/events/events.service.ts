import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HandleError } from 'src/app/shared/error/errorHandler';
import { Event } from 'src/app/shared/models/Event.model';
import { Response } from 'src/app/shared/models/Response.model';
import { points } from 'src/app/shared/models/types/points.type';
import { environment } from 'src/env/env';

const URL = `${environment.host}/events`;

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient, private handleError: HandleError) {}

  getAllEvenets(): Observable<Response<Event[]>> {
    return this.http
      .get<Response<Event[]>>(URL)
      .pipe(catchError((err: any) => this.handleError.handle(err)));
  }
  getFeaturedEvents(): Observable<Response<Event[]>> {
    return this.http.get<Response<Event[]>>(`${URL}/featured`);
  }

  getUsersEvents(): Observable<Response<Event[]>> {
    return this.http.get<Response<Event[]>>(`${URL}/list/me`);
  }
  getSingleEvent(id: string): Observable<Response<Event>> {
    return this.http.get<Response<Event>>(`${URL}/${id}`);
  }
  addComment(comment: string, event: string): Observable<Response<Event>> {
    return this.http.post<Response<Event>>(`${URL}/comments/${event}`, {
      content: comment,
    });
  }
  participateToEvent(id: string) {
    return this.http.post(`${URL}/participate/${id}`, {});
  }
  quitEvent(id: string): Observable<Response<Event>> {
    return this.http.post<Response<Event>>(`${URL}/quit/${id}`, {});
  }
  getLeaderBoard(): Observable<
    Response<{ name: string; forname: string; points: points }[]>
  > {
    return this.http.get<
      Response<{ name: string; forname: string; points: points }[]>
    >(`${URL}/leaderboard`);
  }
}
