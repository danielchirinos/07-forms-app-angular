import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    constructor() { }


    public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

        const value: string = control.value.trim().toLowerCase();
    
        if( value === "strider" ){
            return {
                noStrider: true,
            }
        }
    
        return null;

    }

    public isValidField( form: FormGroup,  field:string ):boolean | null {
        return form.controls[field].errors && form.controls[field].touched
    }
    
    public getFieldError( form: FormGroup, field: string ):string | null {
        if( !form.controls[field]) return null;

        const errors = form.controls[field].errors || {}

        for (const key of Object.keys(errors)) {
            switch (key) {
                case "required":
                    return "Este campo es requerido";
                case "minlength":
                    return `Minimo ${errors["minlength"].requiredLength } caracteres`;

            } 
        }

        return null;
    }
    
    public isFieldOneEqualFieldTwo( ){

        return ( formGroup: FormGroup | AbstractControl ):ValidationErrors | null => {

            const fieldValue1 = formGroup.get("password")?.value
            const fieldValue2 = formGroup.get("passwordConfirm")?.value

            if(fieldValue1 !== fieldValue2){
                formGroup.get("passwordConfirm")?.setErrors({notEqual: true});
                return { notEqual: true }
            }

            return null;
        }

    }
}