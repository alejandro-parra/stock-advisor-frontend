import { Directive } from '@angular/core';
import {AbstractControl, ValidatorFn, Validator, NG_VALIDATORS} from '@angular/forms';

export function numeric(): ValidatorFn {  
    return (control: AbstractControl): { [key: string]: any } | null =>  {
        if(isNaN(control.value) || Number(control.value) < 0) {
            return {numeric: true};
        } else {
            return null;
        }
    }
}

@Directive({
    selector: '[numeric]',  
    providers: [{
        provide: NG_VALIDATORS, 
        useExisting: NumericValidatorDirective,
        multi: true
    }]
})
export class NumericValidatorDirective implements Validator { 
    validate(control: AbstractControl): { [key: string]: any } | null { 
        return numeric()(control);  
    }
}