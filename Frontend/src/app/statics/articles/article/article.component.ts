import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  @Input('title') title! : string ; 
  @Input('content') content! : string ; 
  @Input('id') id!  : string ; 
  @Input('picture') picture! : string 
}
