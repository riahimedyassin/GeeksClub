import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null , [Validators.required]),
      forname : new FormControl(null, [Validators.required]),
      email : new FormControl(null , [Validators.email,Validators.required]),
      age : new FormControl(0 , [Validators.min(16),Validators.max(22), Validators.required]),
      phone : new FormControl(null, [Validators.minLength(8) , Validators.maxLength(8) , Validators.required]),
      CIN: new FormControl(null, [Validators.minLength(8),Validators.maxLength(8) , Validators.required]),
      facebook : new FormControl(null, [Validators.required]),
      password : new FormControl(null, [Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
      address : new FormGroup({
        city : new FormControl(null , [Validators.required]),
        region : new FormControl(null, [Validators.required]),
        country : new FormControl("Tunisia",[Validators.required])
      }),
      question : new FormControl(0,[Validators.required]),
      answer : new FormControl(null,[Validators.required])
    });
  }
  submit() {
    console.log(this.form)
  }
}
