import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/shared/models/Comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input('comment') comment! : Comment; 
}
