import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtService } from 'src/app/services/auth/jwt.service';
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

  constructor(private auth: AuthService, private jwt: JwtService , private router : Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  submit() {
    if (this.form.valid && this.form.touched && !this.form.invalid) {
      this.auth
        .login(this.form.get('email')?.value, this.form.get('password')?.value)
        .subscribe(
          (response: Response<string>) => {
            if (response.status == 200 && response.token) {
              this.error=false ; 
              this.errorMessage="";
              this.jwt.setToken(response.token);
              this.router.navigate(['/dashboard'])
            }
          },
          (err: HttpErrorResponse) => {
            this.errorMessage = err.error.message;
            this.error = true;
          }
        );
    }
  }
}
