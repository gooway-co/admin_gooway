import { FormGroup } from "@angular/forms";

export class ValidationsForm {

    validateForm(form: FormGroup){
        form.markAllAsTouched();
        let validForm = form.valid;
    
        Object.keys(form.controls).forEach(formControlName => {
            console.log(form.controls[formControlName].value);
        });
    }
  
}