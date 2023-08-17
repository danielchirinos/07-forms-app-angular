import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/services/email-validator.serice';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
// import * as customValidators from 'src/app/shared/validators/validators';

@Component({
    templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

    public myForm: FormGroup = this.fb.nonNullable.group({
        name: [ "", [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
        email: [ "", [Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ], [ new EmailValidatorService() ]],
        username: [ "", [Validators.required, this.validatorsService.cantBeStrider ]], 
        password: [ "", [Validators.required, Validators.minLength(6) ]],
        passwordConfirm: [ "", [Validators.required, Validators.minLength(6) ]]
    }, {
        validators: [ this.validatorsService.isFieldOneEqualFieldTwo( ) ]
    }
    )

    constructor(private fb: FormBuilder, private validatorsService: ValidatorsService){}

    isValidField( field: string ):boolean | null {
        return this.validatorsService.isValidField( this.myForm, field)
    }


    onSubmit():void {
        this.myForm.markAllAsTouched();

        console.log(this.myForm.value);
        
    }

}
