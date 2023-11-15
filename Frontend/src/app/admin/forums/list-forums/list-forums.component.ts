import { Component, OnInit } from '@angular/core';
import { ForumsService } from 'src/app/dashboard/shared/services/forum/forums.service';
import { Forum } from 'src/app/shared/models/Forum.model';

@Component({
  selector: 'app-list-forums',
  templateUrl: './list-forums.component.html',
  styleUrls: ['./list-forums.component.scss'],
})
export class ListForumsComponent implements OnInit {
  forum!: Forum[];

  constructor(private forumService: ForumsService) {}
  ngOnInit(): void {
    this.forumService.getAllForums().subscribe((response) => {
      console.log(response);
      this.forum = response.data;
    });
  }
  handleDelete(id: string) {
    this.forumService.deleteForum(id).subscribe((response) => {
      console.log('done');
    });
  }
}
