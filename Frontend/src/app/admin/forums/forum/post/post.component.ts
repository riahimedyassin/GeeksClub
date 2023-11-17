import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumsService } from 'src/app/dashboard/shared/services/forum/forums.service';
import { articleResponse } from 'src/app/shared/models/types/articleResponse.type';
import { message } from 'src/app/shared/models/types/message.type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  constructor(private forumService : ForumsService , private activated : ActivatedRoute){}
  forumID! : string ; 
  postID!: string ; 
  post! : articleResponse ; 
  ngOnInit(): void {
      this.forumID = <string>this.activated.snapshot.paramMap.get('id');
      this.postID=<string> this.activated.snapshot.paramMap.get('post') ;
      this.forumService.getSingleForum(this.forumID).subscribe(response=> {
        this.post=<articleResponse>response.data.articles.find(article => article._id == this.postID)
      })
  }
}
