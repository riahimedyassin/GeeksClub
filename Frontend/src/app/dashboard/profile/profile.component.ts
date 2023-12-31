import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/dashboard/shared/services/user/user.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
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
  file!: File | undefined;
  changePassword: boolean = false;
  passwordForm!: FormGroup;
  pictureUpdated: boolean = false;
  pending: boolean = false;
  constructor(
    private userService: UserService,
    private formbuilder: FormBuilder,
    private router: Router,
    private cloudinary: CloudinaryService
  ) {}
  ngOnInit(): void {
    this.passwordForm = this.formbuilder.nonNullable.group({
      oldPassword: ['', [Validators.required, CustomValidator.password]],
      newPassword: ['', [Validators.required, CustomValidator.password]],
    });
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
    if (this.edit) this.form.enable();
    else {
      this.form.disable();
      this.form.reset();
    }
  }
  handleSubmit() {
    if (this.form.valid && this.form.dirty && !this.pending) {
      this.userService.updateMember(this.user._id, this.form.value).subscribe(
        (response) => {
          this.updated = true;
          let timeout = setTimeout(() => {
            this.updated = false;
            clearTimeout(timeout);
          }, 3000);
          this.form.disable();
          this.edit = false;
        },
        (err) => {
          this.error = true;
          let timeout = setTimeout(() => {
            this.error = false;
            clearTimeout(timeout);
          }, 3000);
        }
      );
    }
  }
  handleChangePassword() {
    if (this.passwordForm.valid && this.passwordForm.dirty) {
      this.userService
        .changePassword(
          this.passwordForm.get('oldPassword')?.value,
          this.passwordForm.get('newPassword')?.value
        )
        .subscribe((response) => {
          this.changePassword = false;
          this.edit = false;
          this.updated = true;
          let timeout = setTimeout(() => {
            this.updated = false;
            clearTimeout(timeout);
          }, 3000);
        });
    }
  }
  handleLogout() {
    this.userService.logout();
    this.router.navigate(['/login/member']);
  }
  setImage(event: any) {
    this.file = event.target.files[0];
  }

  uploadImage() {
    if (this.file != undefined && !this.pending) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.cloudinary.getSignature('members').subscribe((response) => {
        this.cloudinary
          .uploadToCloud(formData, 'members', response)
          .subscribe((response: any) => {
            this.userService
              .uploadImage(response.secure_url)
              .subscribe((response) => {
                this.userService.cacheUser();
                this.user.picture = response.data.picture;
                this.file = undefined;
                this.edit = false;
                this.pictureUpdated = true;
                let timeout = setTimeout(() => {
                  location.reload();
                  clearTimeout(timeout);
                }, 1000);
              });
          });
      });
    }
  }
}
