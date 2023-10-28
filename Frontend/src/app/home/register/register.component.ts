import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/shared/models/Question.model';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  questions : Question[] = [
    {
      value : 0 , 
      question : "What is your best friend's name ?"
    },
    {
      value : 1, 
      question : "What is your pet's name ?"
    },
    {
      value : 2 , 
      question : "What is your favorite color ?"
    }
  ]
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null , [Validators.required , CustomValidator.strings]),
      forname : new FormControl(null, [Validators.required  , CustomValidator.strings]),
      email : new FormControl(null , [Validators.email,Validators.required]),
      age : new FormControl(null, [Validators.min(16),Validators.max(22), Validators.required]),
      phone : new FormControl(null, [Validators.minLength(8) , Validators.maxLength(8) , Validators.required , CustomValidator.numeric]),
      CIN: new FormControl(null, [Validators.minLength(8),Validators.maxLength(8) , Validators.required , CustomValidator.numeric]),
      facebook : new FormControl(null, [Validators.required]),
      password : new FormControl(null, [Validators.required,Validators.minLength(8),Validators.maxLength(20), CustomValidator.password]),
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
  }
}
