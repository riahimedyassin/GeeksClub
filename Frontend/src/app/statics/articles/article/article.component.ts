import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports:[CommonModule,RouterModule],
  standalone:true
})
export class ArticleComponent  {
  @Input('title') title! : string ; 
  @Input('content') content! : string ; 
  @Input('id') id!  : string ; 
  @Input('picture') picture! : string 
}
