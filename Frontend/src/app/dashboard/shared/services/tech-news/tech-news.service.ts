import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TechNews } from 'src/app/shared/models/TechNews.model';

const headers: HttpHeaders = new HttpHeaders({
  'content-type': 'application/json',
  'X-RapidAPI-Key': 'c7ad8485b0mshfb6880614b352d8p173610jsn9cf0f27ecc7d',
  'X-RapidAPI-Host': 'google-api31.p.rapidapi.com',
});

@Injectable({
  providedIn: 'root',
})
export class TechNewsService {
  constructor(private http: HttpClient) {}

  getTechNews(): Observable<{ news: TechNews[] }> {
    return this.http.post<{ news: TechNews[] }>(
      'https://google-api31.p.rapidapi.com/',
      {
        text: 'AI',
        region: 'wt-wt',
        max_results: 50,
      },
      {
        headers: headers,
      }
    );
  }
}
