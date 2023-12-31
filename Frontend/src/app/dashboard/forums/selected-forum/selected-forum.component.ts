import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/models/Forum.model';
import { ForumsService } from '../../shared/services/forum/forums.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';
import { articleResponse } from 'src/app/shared/models/types/articleResponse.type';

@Component({
  selector: 'app-selected-forum',
  templateUrl: './selected-forum.component.html',
  styleUrls: ['./selected-forum.component.scss'],
})
export class SelectedForumComponent implements OnInit {
  forum!: Forum;
  id!: string;
  content: string = '';
  user!: User;
  isSub!: boolean;
  published!: boolean;
  constructor(
    private forumService: ForumsService,
    private activated: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.activated.paramMap.subscribe((params) => {
      this.id = <string>params.get('id');
      this.forumService.getSingleForum(this.id).subscribe((response) => {
        this.forum = response.data;
        this.userService.getCurrentUser().subscribe((response) => {
          this.user = response.data;
          this.isSub = this.isSubscribed();
        });
      });
    });
  }
  isSubscribed() {
    return this.forum.members.includes(this.user._id);
  }
  subscribe() {
    this.forumService.subscribeToForum(this.id).subscribe((response) => {
      this.isSub = true;
    });
  }
  unsubscribe() {
    this.forumService.unsubscribeFromForum(this.id).subscribe((response) => {
      this.isSub = false;
    });
  }
  postArticle() {
    if (this.content.trim() != '' && this.isSub) {
      this.forumService
        .postArticle(this.content, this.id)
        .subscribe((response) => {
          this.forum.articles = [...response.data];
          this.content = '';
          this.published = true;
          let timeout= setTimeout(() => {
            this.published = false;
            clearTimeout(timeout)
          }, 3000);
        });
    }
  }
  handleCommentChange(event: articleResponse[]) {
    this.forum.articles = event;
  }
  trackBy(index: number, item: articleResponse): string {
    return item._id;
  }
}
