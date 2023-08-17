 import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './basic-page.component.html',
    styles: [ ]
})
export class BasicPageComponent implements OnInit {
    // con formGroup
    // myForm: FormGroup = new FormGroup({
    //     name: new FormControl(""),
    //     price: new FormControl(0),
    //     insStorage: new FormControl(0),
    // })

    // con form group
    myForm: FormGroup = this.fb.nonNullable.group({
        name: ["", [ Validators.required, Validators.minLength(3) ] ],
        price: [0, [ Validators.required, Validators.min(0) ] ],
        inStorage: [ 0, [ Validators.required, Validators.min(0) ]],
    })

    constructor ( private fb: FormBuilder){}

    ngOnInit(): void {
        this.myForm.reset({

        })
    }

    isValidField( field:string ):boolean | null {
        return this.myForm.controls[field].errors && this.myForm.controls[field].touched
    }
    
    getFieldError( field: string ):string | null {
        if( !this.myForm.controls[field]) return null;

        const errors = this.myForm.controls[field].errors || {}

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

    onSave():void {

        if(!this.myForm.valid){
            this.myForm.markAllAsTouched();
            return
        }

        console.log(this.myForm.value);

        this.myForm.reset();
        
    }
    
}
