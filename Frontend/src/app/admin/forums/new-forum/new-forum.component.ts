import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumsService } from 'src/app/dashboard/shared/services/forum/forums.service';

@Component({
  selector: 'app-new-forum',
  templateUrl: './new-forum.component.html',
  styleUrls: ['./new-forum.component.scss'],
})
export class NewForumComponent implements OnInit {
  form!: FormGroup;
  done: boolean = false; // Notification Trigger
  error: boolean = false; // Error Notification Trigger
  constructor(
    private formBuilder: FormBuilder,
    private forumService: ForumsService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      descreption: ['',[Validators.required]],
    });
  }
  handleSubmit() {
    if (this.form.valid && this.form.dirty) {
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
            setTimeout(()=> this.error= false , 3000)
          }
        );
    }
  }
}
