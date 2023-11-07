import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Article } from 'src/app/shared/models/Article.model';
import { Response } from 'src/app/shared/models/Response.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  constructor(private articleService: ArticlesService) {}
  articlesResponse!: Response<Article[]>;
  articles!: Article[];
  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe((response) => {
      this.articlesResponse = response;
      this.articles=this.articlesResponse.data
    });
  }
}
