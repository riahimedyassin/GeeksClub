import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Forum } from 'src/app/shared/models/Forum.model';
import { Response } from 'src/app/shared/models/Response.model';
import { environment } from 'src/env/env';

const URL = `${environment.host}/forums`;

@Injectable({
  providedIn: 'root',
})
export class ForumsService {
  constructor(private http: HttpClient) {}

  getAllForums(): Observable<Response<Forum[]>> {
    return this.http.get<Response<Forum[]>>(`${URL}`);
  }
  getSingleForum(id : string ) : Observable<Response<Forum>> {
    return this.http.get<Response<Forum>>(`${URL}/${id}`)
  }
}
