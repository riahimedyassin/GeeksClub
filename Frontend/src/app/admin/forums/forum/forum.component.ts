import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private formBuilder: FormBuilder
  ) {}

  edit: boolean = false;
  id!: string;
  singleForum!: Forum;
  members: User[] = [];
  form!: FormGroup;
  ngOnInit(): void {
    this.id = <string>this.activated.snapshot.paramMap.get('id');
    this.forumService.getSingleForum(this.id).subscribe((response) => {
      this.form = this.formBuilder.group({
        name: { value: response.data.name, disabled: !this.edit },
        descreption: { value: response.data.descreption, disabled: !this.edit },
      });
      this.singleForum = response.data;
      this.singleForum.members.forEach((member) => {
        this.userService.getMemberDetails(member).subscribe((response) => {
          this.members.push(response.data);
        });
      });
    });
  }
  saveChanges() {
    if (this.form.valid && this.form.touched) {
      this.forumService
        .changeForum(
          this.id,
          this.form.get('name')?.value,
          this.form.get('descreption')?.value
        )
        .subscribe((response) => {
          this.edit = false;
        });
    }
  }
  handleEdit() {
    this.edit = !this.edit;
    if (this.edit) {
      this.form.controls['name'].enable();
      this.form.controls['descreption'].enable();
    } else {
      this.form.controls['name'].setValue(this.singleForum.name)
      this.form.controls['name'].disable();
      this.form.controls['descreption'].setValue(this.singleForum.descreption)
      this.form.controls['descreption'].disable();
    }
  }
}
