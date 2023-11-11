import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/models/Comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit  {
  @Input('comment') comment! : Comment;
  ngOnInit(): void {
      console.log(this.comment)
  }
  
}
