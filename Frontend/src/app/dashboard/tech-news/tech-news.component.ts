import { Component, OnInit } from '@angular/core';
import { TechNewsService } from '../shared/services/tech-news/tech-news.service';
import { TechNews } from 'src/app/shared/models/TechNews.model';

@Component({
  selector: 'app-tech-news',
  templateUrl: './tech-news.component.html',
  styleUrls: ['./tech-news.component.scss'],
})
export class TechNewsComponent implements OnInit {
  news!: TechNews[];
  error : boolean = false ; 

  constructor(private techNews: TechNewsService) {}
  ngOnInit(): void {
    this.techNews.getTechNews().subscribe(
      (res) => {
        this.news = res.news;
      },
      (err) => {
        this.error=true ; 
      }
    );
  }
}
