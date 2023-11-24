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
  public static cleanChat(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const bad = ['fuck', 'shit', 'nigga', 'jerk', 'ass'];
    let index = 0;
    while (index < bad.length && !value.includes(bad[index])) index++;
    if (index == bad.length) return null;
    return { bad: true };
  }
  public static  role(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const possible = ["President", "Vice President", "VP Media" , "VP Dev" , "VP RH" , "Assistant Media","Asistant Dev","Assistant RH"]
    if(possible.includes(value)) return null ;
    return { role: false };
  }
  public static eventCategorie(control : AbstractControl) {
    const value = control.value ; 
    const possible = ['reunion','formation','event','assignment']
    if(possible.includes(value.toLowerCase())) return null 
    return {event : false }
  }
}
