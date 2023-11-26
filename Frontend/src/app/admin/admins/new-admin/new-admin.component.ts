import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss'],
})
export class NewAdminComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private adminServie: AdminService
  ) {}
  form!: FormGroup;
  added: boolean = false;
  error: boolean = false;
  roles: string[] = [
    'President',
    'Vice President',
    'VP Media',
    'VP Dev',
    'VP RH',
    'Assistant Media',
    'Asistant Dev',
    'Assistant RH',
  ];
  ngOnInit(): void {
    this.form = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, CustomValidator.strings]],
      forname: ['', [Validators.required, CustomValidator.strings]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidator.password]],
      role: ['Assistant RH', [Validators.required]],
      isSup: false,
      facebook: ['', [Validators.required, CustomValidator.facebook]],
      phone: [
        0,
        [
          Validators.required,
          CustomValidator.numeric,
          Validators.pattern('[0-9]{8}'),
        ],
      ],
      age: [0, [Validators.required, CustomValidator.numeric]],
    });
  }
  handleSubmit() {
    if (this.form.valid && this.form.dirty) {
      this.adminServie.registerAdmin(this.form.value).subscribe(
        (response) => {
          this.added = true;
          let timeout = setTimeout(() => {
            this.added = false
            clearTimeout(timeout)
          }, 3000);
          this.form.reset();
        },
        (err) => {
          this.error = true;
          let timeout = setTimeout(() => {
            this.error = false;
            clearTimeout(timeout);
          }, 3000);
        }
      );
    } else {
      this.error = true;
      let timeout = setTimeout(() => {
        this.error = false;
        clearTimeout(timeout);
      }, 3000);
    }
  }
}
