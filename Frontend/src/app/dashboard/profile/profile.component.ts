import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { User } from 'src/app/shared/models/User.model';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  form!: FormGroup;
  edit: boolean = false;
  updated: boolean = false;
  error: boolean = false;
  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((response) => {
      this.user = response.data;
      this.form = this.formbuilder.nonNullable.group({
        name: [this.user.name, [Validators.required, CustomValidator.strings]],
        forname: [
          this.user.forname,
          [Validators.required, CustomValidator.strings],
        ],
        age: [this.user.age, [Validators.required, CustomValidator.numeric]],
        email: [this.user.email, [Validators.required, Validators.email]],
        address: this.formbuilder.nonNullable.group({
          city: [this.user.address.city, [Validators.required]],
          region: [this.user.address.region, [Validators.required]],
        }),
        facebook: [
          this.user.facebook,
          [Validators.required, CustomValidator.facebook],
        ],
      });
      this.form.disable();
    });
  }
  handleEdit() {
    this.edit = !this.edit;
    this.edit ? this.form.enable() : this.form.disable();
  }
  handleSubmit() {
    if (this.form.valid && this.form.touched) {
      this.userService
        .updateMember(this.user._id, <User>this.form.value)
        .subscribe(
          (response) => {
            this.updated = true;
            setTimeout(() => (this.updated = false), 3000);
            this.form.disable();
            this.edit=false ; 
          },
          (err) => {
            (this.error = true), setTimeout(() => (this.error = false), 3000);
          }
        );
    }
  }
  handleLogout() {
    this.userService.logout();
    this.router.navigate(['/login/member']);
  }
}
