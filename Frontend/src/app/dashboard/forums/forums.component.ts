import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/models/Forum.model';
import { ForumsService } from '../shared/services/forum/forums.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit {
  type! : 'user' | 'all' 
  error : boolean= false ;
  forums! : Forum[] ; 
  constructor(private forumService : ForumsService) {}

  ngOnInit(): void {
      this.type='all'; 
      this.forumService.getAllForums().subscribe(response=> {
        this.forums=response.data
      },(err)=> {
        this.error=true
      })
  }

}
