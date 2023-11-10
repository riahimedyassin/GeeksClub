import { Component, Input, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/models/Forum.model';
import { articleResponse } from 'src/app/shared/models/types/articleResponse.type';
import { message } from 'src/app/shared/models/types/message.type';
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input('article') article! : articleResponse ; 
  constructor(private reveal : RevealAnimationService ){}
  ngOnInit(): void {
    this.reveal.initScrollReveal('bottom',1000,".reveal")
  }
}
