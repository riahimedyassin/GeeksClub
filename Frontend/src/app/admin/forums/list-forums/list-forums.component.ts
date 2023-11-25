import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumsService } from 'src/app/dashboard/shared/services/forum/forums.service';
import { Forum } from 'src/app/shared/models/Forum.model';

@Component({
  selector: 'app-list-forums',
  templateUrl: './list-forums.component.html',
  styleUrls: ['./list-forums.component.scss'],
})
export class ListForumsComponent implements OnInit {
  forum!: Forum[];

  constructor(private forumService: ForumsService, private router : Router) {}
  ngOnInit(): void {
    this.forumService.getAllForums().subscribe((response) => {
      this.forum = response.data;
    });
  }
  handleDelete(id: string) {
    this.forumService.deleteForum(id).subscribe((response) => {
        this.router.navigateByUrl(`/admin/forums/${id}`)
    });
  }
}
