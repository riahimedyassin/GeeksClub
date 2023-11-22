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
  postArticle(article: Article): Observable<Response<Article>> {
    return this.http.post<Response<Article>>(`${URL}`, article);
  }
  deleteArticle(id: string) {
    return this.http.delete(`${URL}/${id}`);
  }
  updateArticle(id : string, article : Article ) : Observable<Article> {
    return this.http.patch<Article>(`${URL}/${id}`,article)
  }
  getSignature(folder : string ) {
    return this.http.get(`${URL}/image/signature/${folder}`)
  }
  uploadImage(id:string , link : string) :Observable<Response<Article>> {
    return this.http.post<Response<Article>>(`${URL}/image/upload/${id}`,{link})
  }

}
