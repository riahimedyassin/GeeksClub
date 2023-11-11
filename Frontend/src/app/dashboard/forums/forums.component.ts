import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/models/Forum.model';
import { ForumsService } from '../shared/services/forum/forums.service';
import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit {
  type! : 'user' | 'all' 
  error : boolean= false ;
  forums! : Forum[] ; 
  subscribedForums : Forum[]= [];
  constructor(private forumService : ForumsService, private userService : UserService) {}

  ngOnInit(): void {
      this.type='all'; 
      this.forumService.getAllForums().subscribe(response=> {
        this.forums=response.data
        this.userService.getCurrentUser().subscribe(response=> {
          this.subscribedForums=this.forums.filter(element => element.members.includes(response.data._id))
        })
      },(err)=> {
        this.error=true
      })
  }

}
