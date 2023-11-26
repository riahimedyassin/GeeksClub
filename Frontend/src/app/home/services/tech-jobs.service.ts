import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/models/Job.model';

const headers: HttpHeaders = new HttpHeaders({
  'X-RapidAPI-Key': 'c7ad8485b0mshfb6880614b352d8p173610jsn9cf0f27ecc7d',
  'X-RapidAPI-Host': 'remote-jobs-api.p.rapidapi.com',
});

@Injectable({
  providedIn: 'root',
})
export class TechJobsService {
  constructor(private http: HttpClient) {}

  getJobs(): Observable<{ items: Job[] }> {
    return this.http.get<{ items: Job[] }>(
      'https://remote-jobs-api.p.rapidapi.com/jobs',
      {
        headers: headers,
        params: {
          category: 'engineering'
        }
      }
    );
  }
}
