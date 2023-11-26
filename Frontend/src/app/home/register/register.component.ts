import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidator } from 'src/app/shared/validators/CustomValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private formBuilder: FormBuilder) {}
  form!: FormGroup;
  trigger: boolean = false;
  closeNotification: boolean = false;
  questions = [
    {
      question: "What is your best friend's name ?",
    },
    {
      question: "What is your pet's name ?",
    },
    {
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
    this.form = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, CustomValidator.strings]],
      forname: ['', [Validators.required, CustomValidator.strings]],
      email: ['', [Validators.required, Validators.email]],
      age: [
        0,
        [
          Validators.required,
          Validators.min(16),
          Validators.max(22),
          CustomValidator.numeric,
        ],
      ],
      phone: [
        0,
        [
          Validators.required,
          Validators.pattern('[0-9]{8}'),
          CustomValidator.numeric,
        ],
      ],
      CIN: [
        null,
        [
          Validators.required,
          CustomValidator.numeric,
          Validators.pattern('[0-9]{8}'),
        ],
      ],
      facebook: ['', [Validators.required, CustomValidator.facebook]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          CustomValidator.password,
        ],
      ],
      address: this.formBuilder.nonNullable.group({
        city: ['', [Validators.required, CustomValidator.strings]],
        region: ['', [Validators.required, CustomValidator.strings]],
        country: [{ value: 'Tunisia', disabled: true }, [Validators.required]],
      }),
      recovery_question: this.formBuilder.nonNullable.group({
        question: [this.questions[0].question, [Validators.required]],
        answer: ['', [Validators.required]],
      }),
    });
  }
  submit() {
    if (this.form.valid && this.form.dirty) {
      this.auth.register(this.form.value).subscribe(
        (response) => {
          this.alert = this.alerts[0];
          this.form.reset();
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
