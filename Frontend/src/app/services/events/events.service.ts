import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HandleError } from 'src/app/shared/error/errorHandler';
import { Event } from 'src/app/shared/models/Event.model';
import { Response } from 'src/app/shared/models/Response.model';
import { User } from 'src/app/shared/models/User.model';
import { points } from 'src/app/shared/models/types/points.type';
import { environment } from 'src/env/env';

const URL = `${environment.host}/events`;

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient, private handleError: HandleError) {}

  getAllEvenets(): Observable<Response<Event[]>> {
    return this.http.get<Response<Event[]>>(URL);
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
  getParticipants(id: string): Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>(`${URL}/members/${id}`);
  }
  endEvent(id: string): Observable<Response<Event>> {
    return this.http.post<Response<Event>>(`${URL}/end/${id}`, {});
  }
  confirmParticipation(eventId: string, userId: string) {
    return this.http.post(`${URL}/confirm/${eventId}/${userId}`, {});
  }
  editEvent(id: string, changes: Event) {
    return this.http.patch(`${URL}/${id}`, changes);
  }
  addNewEvent(event: Event) : Observable<Response<Event>> {
    return this.http.post<Response<Event>>(`${URL}`, event);
  }
  deleteEvent(id : string) {
    return this.http.delete(`${URL}/${id}`)
  }
  getImageSignature(folder : string ) {
    return this.http.get(`${URL}/image/signature/${folder}`)
  }
  uploadImage( id :string , link : string ) : Observable<Response<Event>> {
    return this.http.post<Response<Event>>(`${URL}/image/upload/${id}`,{link})
  }
}
