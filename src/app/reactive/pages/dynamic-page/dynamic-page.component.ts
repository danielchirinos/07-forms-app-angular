import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    templateUrl: './dynamic-page.component.html',
    styles: [ ]
})
export class DynamicPageComponent {

    public myForm: FormGroup = this.fb.nonNullable.group({
        name: ["", [ Validators.required, Validators.minLength(3) ]],
        favoriteGames: this.fb.array([
            ["Meta Gear", Validators.required],
            ["Death Stranding", Validators.required],
        ])
    })

    public newFavorite: FormControl = new FormControl("", Validators.required)

    constructor(private fb: FormBuilder){}

    // getter
    get favoriteGames(){
        return this.myForm.get("favoriteGames") as FormArray;
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

    isValidFieldInArray( formArray: FormArray, index:number):boolean | null{
        return formArray.controls[index].errors && formArray.controls[index].touched
    }


    onAddToFavorite():void {
        if(this.newFavorite.invalid) return;
        
        const newGame = this.newFavorite.value

        // sin el form builder
        // this.favoriteGames.push( new FormControl (this.newFavorite , Validators.required) )

        this.favoriteGames.push(
            this.fb.control( newGame, Validators.required )
        )

        this.newFavorite.reset()
        
    }

    onDeleteFavorite(index: number):void {
        this.favoriteGames.removeAt(index)
    }

    onSubmit():void {

        if( !this.myForm.valid ){
            this.myForm.markAllAsTouched()
            return;
        }

        console.log(this.myForm.value);

        this.myForm.reset();
        // (this.myForm.controls["favoriteGames"] as FormArray) = this.fb.array([]);
        this.favoriteGames.clear();
        
    }

}
