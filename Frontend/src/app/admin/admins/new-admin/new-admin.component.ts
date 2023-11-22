import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';
import { Question } from 'src/app/shared/models/Question.model';

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
  added : boolean = false ;
  error : boolean = false  
  ngOnInit(): void {
    this.form = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, CustomValidator.strings]],
      forname: ['', [Validators.required, CustomValidator.strings]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidator.password]],
      role: ['Vice President', [Validators.required]],
      isSup: false,
      facebook: ['', [Validators.required, CustomValidator.facebook]],
      phone: [null, [Validators.required, CustomValidator.numeric]],
      age: [null, [Validators.required, CustomValidator.numeric]],
    });
  }
  handleSubmit() {
    if (this.form.valid && this.form.touched) {
      this.adminServie.registerAdmin(this.form.value).subscribe((response) => {
        this.added=true 
        setTimeout(()=>this.added=false , 3000)
      },err=> {
        this.error = true 
        setTimeout(()=>this.error = false , 3000)
      });
    }
    else {
      console.log(this.form)
    }
  }
}