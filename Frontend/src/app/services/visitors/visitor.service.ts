import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/shared/models/Response.model';
import { Visitor } from 'src/app/shared/models/Visitor.model';
import { environment } from 'src/env/env';

const URL = `${environment.host}/visitors`


@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private http : HttpClient) { }


  getCurrentIP() : Observable<Visitor> {
    return this.http.get<Visitor>(`https://ipinfo.io/json?token=${environment.ip_token}`)
  }

  getAllVisitros() : Observable<Response<Visitor[]>>{
    return this.http.get<Response<Visitor[]>>(URL)
  }
  saveVisitor(visitor : Visitor)  {
    return this.http.post(URL,visitor)
  }

}
