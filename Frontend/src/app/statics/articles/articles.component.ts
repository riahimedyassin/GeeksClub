import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { Article } from 'src/app/shared/models/Article.model';
import { Response } from 'src/app/shared/models/Response.model';
import { ArticleComponent } from './article/article.component';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [
    NavbarComponent,
    ArticleComponent,
    ErrorComponent,
    FooterComponent,
    CommonModule,
  ],
  standalone: true,
})
export class ArticlesComponent implements OnInit {
  constructor(private articleService: ArticlesService) {}
  articles!: Article[];
  error: boolean = false;
  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(
      (response) => {
        this.error = false;
        this.articles = response.data;
      },
      (error: HttpErrorResponse) => {
        this.error = true;
      }
    );
  }
}
