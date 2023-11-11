import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/Article.model';
import { environment } from 'src/env/env';
import { Response } from 'src/app/shared/models/Response.model';

const URL = `${environment.host}/articles`;

@Injectable({
  providedIn: 'root',
})



export class ArticlesService {
  constructor(private http: HttpClient) {}
  getAllArticles() : Observable<Response<Article[]>> {
    return this.http.get<Response<Article[]>>(`${URL}`);
  }
  getSingleArticle(id: string): Observable<Response<Article>> {
    return this.http.get<Response<Article>>(`${URL}/${id}`);
  }
  postArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${URL}`, article);
  }
  deleteArticle(id: string): void {
    this.http.delete(`${URL}/${id}`);
  }
  updateArticle(id : string, article : Article ) : Observable<Article> {
    return this.http.put<Article>(`${URL}/${id}`,article)
  }


}