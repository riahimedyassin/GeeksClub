import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumsService } from 'src/app/dashboard/shared/services/forum/forums.service';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { Forum } from 'src/app/shared/models/Forum.model';
import { User } from 'src/app/shared/models/User.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  constructor(
    private forumService: ForumsService,
    private activated: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  edit: boolean = false;
  id!: string;
  singleForum!: Forum;
  members: User[] = [];
  form!: FormGroup;
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.forumService.getSingleForum(this.id).subscribe((response) => {
      this.form = this.formBuilder.nonNullable.group({
        name: [response.data.name, [Validators.required]],
        descreption: [response.data.descreption, [Validators.required]],
      });
      this.form.disable();
      this.singleForum = response.data;
      this.singleForum.members.forEach((member) => {
        this.userService.getMemberDetails(member).subscribe((response) => {
          this.members.push(response.data);
        });
      });
    });
  }
  saveChanges() {
    if (this.form.valid && this.form.dirty) {
      this.forumService
        .changeForum(
          this.id,
          this.form.value
        )
        .subscribe((response) => {
          this.edit = false;
        });
    }
  }
  handleEdit() {
    this.edit = !this.edit;
    if (this.edit) this.form.enable();
    else {
      this.form.disable() 
      this.form.reset();
    }
  }
  handleDelete() {
    this.forumService.deleteForum(this.id).subscribe((response) => {
      this.router.navigateByUrl('/admin/forums/list');
    });
  }
}
