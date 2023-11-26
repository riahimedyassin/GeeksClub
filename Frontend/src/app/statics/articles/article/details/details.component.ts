import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Article } from 'src/app/shared/models/Article.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  id!: string;
  article!: Article;

  constructor(
    private activated: ActivatedRoute,
    private articleService: ArticlesService
  ) {}
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.articleService.getSingleArticle(this.id).subscribe((response) => {
      this.article = response.data;
    });
  }
}
