import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ForumsService } from 'src/app/dashboard/shared/services/forum/forums.service';
import { articleResponse } from 'src/app/shared/models/types/articleResponse.type';
import { RevealAnimationService } from 'src/app/shared/services/reveal-animation.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss'],
})
export class RepliesComponent {
  @Input('article') article!: articleResponse;
  @Input('forum') forum!: string;
  @Output() oncomment: EventEmitter<articleResponse[]> = new EventEmitter<
    articleResponse[]
  >();
  showComment: boolean = false;
  comment!: string;
  posted : boolean = false ; 
  constructor(private forumService: ForumsService) {}
  ngOnInit(): void {}
  handleComment() {
    if (this.comment.trim() != '') {
      this.forumService
        .postComment(this.comment, this.forum, this.article._id)
        .subscribe((response) => {
          this.posted=true ;
          setTimeout(()=>this.posted=false , 3000)
          this.comment="";
          this.oncomment.emit(response.data);
        });
    }
  }
}
