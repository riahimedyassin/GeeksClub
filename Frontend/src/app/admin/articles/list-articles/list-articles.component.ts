import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles/articles.service';
import { Article } from 'src/app/shared/models/Article.model';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss'],
})
export class ListArticlesComponent implements OnInit {
  constructor(private articleService: ArticlesService) {}
  articles!: Article[];

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe((response) => {
      this.articles = response.data;
    });
  }
  handleDelete(id : string ) {
    this.articleService.deleteArticle(id).subscribe(response=> {
      this.articles=this.articles.filter(artcile => artcile._id!=id )
    })
  }
}
