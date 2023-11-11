import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Forum } from 'src/app/shared/models/Forum.model';
import { Response } from 'src/app/shared/models/Response.model';
import { articleResponse } from 'src/app/shared/models/types/articleResponse.type';
import { message } from 'src/app/shared/models/types/message.type';
import { environment } from 'src/env/env';
import { HandleError } from '../../../../shared/error/errorHandler';

const URL = `${environment.host}/forums`;

@Injectable({
  providedIn: 'root',
})
export class ForumsService {
  constructor(private http: HttpClient, private handleError: HandleError) {}

  getAllForums(): Observable<Response<Forum[]>> {
    return this.http.get<Response<Forum[]>>(`${URL}`);
  }
  getSingleForum(id: string): Observable<Response<Forum>> {
    return this.http.get<Response<Forum>>(`${URL}/${id}`);
  }
  subscribeToForum(id: string) {
    return this.http.post(`${URL}/subscribe`, { forum: id });
  }
  unsubscribeFromForum(id: string) {
    return this.http.post(`${URL}/unsubscribe`, { forum: id });
  }
  postArticle(
    content: string,
    id: string
  ): Observable<Response<articleResponse[]>> {
    return this.http.post<Response<articleResponse[]>>(
      `${URL}/articles/${id}`,
      { message: { content } }
    );
  }
  postComment(
    content: string,
    forum: string,
    article: string
  ): Observable<Response<articleResponse[]>> {
    return this.http.post<Response<articleResponse[]>>(
      `${URL}/articles/${forum}/${article}`,
      { reply: content }
    );
  }
  getUsersForums(): Observable<Response<Forum[]>> {
    return this.http.get<Response<Forum[]>>(`${URL}/user/me`);
  }
}
