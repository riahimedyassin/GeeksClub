import { AbstractControl, ValidationErrors } from '@angular/forms';
export class CustomValidator {
  public static password(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex: RegExp = /(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}/;
    if (control.touched && !regex.test(value)) {
      return { strength: false };
    }
    return null;
  }
  public static strings(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex: RegExp = /.\s./;
    if (regex.test(value) && control.touched) {
      return { invalid: true };
    }
    return null;
  }
  public static numeric(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value)) return { number: false };
    return null;
  }
  public static facebook(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex: RegExp = /^https:\/\/(www.)?facebook.com\//;
    if (regex.test(value)) return null;
    return { facebook: false };
  }
  public cleanChat(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const bad = ['fuck', 'shit', 'nigga', 'jerk', 'ass'];
    let index = 0;
    while (index < bad.length && !value.includes(bad[index])) index++;
    if (index == bad.length) return null;
    return { bad: true };
  }
  public role(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value == 'President' || value == 'Vice President' || value == 'Other') {
      return null;
    }
    return { role: false };
  }
}
