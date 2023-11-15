import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ForumsService } from 'src/app/dashboard/shared/services/forum/forums.service';

@Component({
  selector: 'app-new-forum',
  templateUrl: './new-forum.component.html',
  styleUrls: ['./new-forum.component.scss'],
})
export class NewForumComponent implements OnInit {
  form!: FormGroup;
  done: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private forumService: ForumsService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      descreption: '',
    });
  }
  handleSubmit() {
    if (this.form.valid && this.form.touched) {
      this.forumService
        .addNewForum(
          this.form.get('name')?.value,
          this.form.get('descreption')?.value
        )
        .subscribe(
          (response) => {
            this.done = true;
            setTimeout(() => {
              this.done = false;
            }, 3000);
            this.form.reset();
          },
          (err) => {
            this.error = true;
            this.errorMessage = err.message;
          }
        );
    }
  }
}
