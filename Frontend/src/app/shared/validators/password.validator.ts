import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validatePassword= (name : string)  : ValidatorFn=> {
        return (control : AbstractControl) : ValidationErrors | null => {
            const value = control.value ;
            const regex : RegExp = /(?=.*\d.*)(?=.*[a-zA-Z].*)(?=.*[!#\$%&\?].*).{8,}/
            if(control.touched && !regex.test(value)  ) {
                return {strength: false}
            } 
            return null ; 
        }
}   