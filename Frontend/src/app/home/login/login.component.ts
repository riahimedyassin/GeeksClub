import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtService } from 'src/app/services/auth/jwt.service';
import { Question } from 'src/app/shared/models/Question.model';
import { Response } from 'src/app/shared/models/Response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: boolean = false;
  errorMessage!: string;
  forget: boolean = false;
  forgetForm!: FormGroup;
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
  recovered: boolean = false;
  errorRecovering: boolean = false;
  constructor(
    private auth: AuthService,
    private jwt: JwtService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.forgetForm = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      question: [this.questions[0].question, [Validators.required]],
      answer: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  submit() {
    if (this.form.valid && this.form.dirty) {
      this.auth
        .login(this.form.get('email')?.value, this.form.get('password')?.value)
        .subscribe(
          (response: Response<string>) => {
            if (response.status == 200 && response.token) {
              this.jwt.setToken(response.token);
              this.router.navigate(['/dashboard']);
            }
          },
          (err: HttpErrorResponse) => {
            this.errorMessage = err.error.message;
            this.error = true;
          }
        );
    }
  }
  handleReset() {
    if (this.forgetForm.valid && this.forgetForm.dirty) {
      const email = this.forgetForm.get('email')?.value;
      const password = this.forgetForm.get('password')?.value;
      const answer = this.forgetForm.get('answer')?.value;
      const question = this.forgetForm.get('question')?.value;

      this.auth.recoverAccount(question, answer, email, password).subscribe(
        (response) => {
          this.recovered = true;
          let timeout = setTimeout(() => {
            this.recovered = false;
            clearTimeout(timeout);
          }, 3000);
          this.forget = false;
        },
        (err) => {
          this.errorRecovering = true;
          let timeout = setTimeout(() => {
            this.errorRecovering = false;
            clearTimeout(timeout);
          }, 3000);
        }
      );
    }
  }
}
