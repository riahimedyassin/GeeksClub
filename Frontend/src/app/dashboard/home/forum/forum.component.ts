import { Component, Input } from '@angular/core';
import { Forum } from 'src/app/shared/models/Forum.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent {
  @Input('forum') forum! : Forum
}
