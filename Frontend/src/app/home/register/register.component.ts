import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Question } from 'src/app/shared/models/Question.model';
import { User } from 'src/app/shared/models/User.model';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService) {}
  form!: FormGroup;
  trigger: boolean = false;
  questions: Question[] = [
    {
      value: 0,
      question: "What is your best friend's name ?",
    },
    {
      value: 1,
      question: "What is your pet's name ?",
    },
    {
      value: 2,
      question: 'What is your favorite color ?',
    },
  ];
  alerts = [
    {
      title: 'Registered Succcessfully',
      message: 'Your request will be consulted by an admin ASAP',
      status: true,
    },
    {
      title: 'You are already registerd !',
      message: 'Check out your email for any feed back !',
      status: false,
    },
    {
      title: 'Cannot procceed',
      message: 'Please try again later !',
      status: false,
    },
  ];
  alert!: { title: string; message: string; status: boolean } | null;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        CustomValidator.strings,
      ]),
      forname: new FormControl(null, [
        Validators.required,
        CustomValidator.strings,
      ]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      age: new FormControl(null, [
        Validators.min(16),
        Validators.max(22),
        Validators.required,
      ]),
      phone: new FormControl(null, [
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.required,
        CustomValidator.numeric,
      ]),
      CIN: new FormControl(null, [
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.required,
        CustomValidator.numeric,
      ]),
      facebook: new FormControl(null, [
        Validators.required,
        CustomValidator.facebook,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        CustomValidator.password,
      ]),
      address: new FormGroup({
        city: new FormControl(null, [Validators.required]),
        region: new FormControl(null, [Validators.required]),
        country: new FormControl({ value: 'Tunisia', disabled: true }, [
          Validators.required,
        ]),
      }),
      recovery_question: new FormGroup({
        question: new FormControl(this.questions[0].question, [
          Validators.required,
        ]),
        answer: new FormControl(null, [Validators.required]),
      }),
    });
  }
  submit() {
    if (this.form.valid && !this.form.invalid && this.form.touched) {
      let user: User = this.form.value;
      this.auth.register(user).subscribe(
        (response) => {
          this.alert = this.alerts[0];
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status === 403) {
            this.alert = this.alerts[1];
          } else {
            this.alert = this.alerts[2];
          }
        }
      );
    }
  }
  handleHide() {
    this.alert = null;
  }
}
