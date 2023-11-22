import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { Admin } from 'src/app/shared/models/Admin.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private cloudinary: CloudinaryService
  ) {}
  admin!: Admin;
  form!: FormGroup;
  edit: boolean = false;
  passwordForm!: FormGroup;
  ngOnInit(): void {
    this.adminService.getCurrentAdmin().subscribe((response) => {
      this.form = this.formBuilder.nonNullable.group({
        name: [
          response.data.name,
          [Validators.required, CustomValidator.strings],
        ],
        forname: [
          response.data.forname,
          [Validators.required, CustomValidator.strings],
        ],
        facebook: [
          response.data.facebook,
          [Validators.required, CustomValidator.facebook],
        ],
        age: [
          response.data.age,
          [Validators.required, CustomValidator.numeric],
        ],
        role: [response.data.role, [Validators.required]],
        phone: [
          response.data.phone,
          [Validators.required, CustomValidator.numeric],
        ],
        email: [response.data.email, [Validators.required, Validators.email]],
        picture: response.data.picture,
      });
      this.form.disable();
      this.admin = response.data;
    });
    this.passwordForm = this.formBuilder.nonNullable.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, CustomValidator.password]],
    });
  }
  handleSubmit() {
    if (this.form.valid && this.form.touched) {
      this.adminService.editAdmin(this.form.value).subscribe((response) => {
        console.log('done');
        this.edit = false;
      });
    }
  }
  handleEdit() {
    this.edit = !this.edit;
    this.edit ? this.form.enable() : this.form.disable();
  }
  handlePassword() {
    if (this.passwordForm.valid && this.passwordForm.touched) {
      this.adminService
        .changePassword(
          this.passwordForm.get('password')?.value,
          this.passwordForm.get('newPassword')?.value
        )
        .subscribe((response) => {
          this.passwordForm.reset();
        });
    }
  }
  file!: File | undefined;
  changePicture(event: any) {
    this.file = event.target.files[0];
  }
  saveImage() {
    if (this.file != undefined) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.adminService.getSignature('admin').subscribe((response) => {
        const signData: any = response;
        this.cloudinary
          .uploadToCloud(formData, 'admin', signData)
          .subscribe((response: any) => {
            this.adminService
              .uploadImage(response['secure_url'])
              .subscribe((response) => {
                this.admin.picture = response.data.picture;
                this.adminService.cacheAdmin();
                this.file=undefined ; 
                this.edit = false ; 
              });
          });
      });
    }
  }
}
