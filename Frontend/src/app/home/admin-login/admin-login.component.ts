import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtService } from 'src/app/services/auth/jwt.service';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router
  ) {}
  form!: FormGroup;
  error: boolean = false;
  errorMessage: string = '';
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        CustomValidator.password,
        Validators.required,
      ]),
    });
  }
  handleLogin() {
    if (this.form.valid && !this.form.invalid && this.form.touched) {
      this.authService
        .loginAdmin(
          this.form.get('email')?.value,
          this.form.get('password')?.value
        )
        .subscribe(
          (response) => {
            this.jwtService.setToken(response.data);
            this.router.navigate(['/admin']);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this.errorMessage = 'Invalid Email or Password';
            } else {
              this.errorMessage = error.message;
            }
          }
        );
    }
  }
}
