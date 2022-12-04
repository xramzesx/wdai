import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[appValidateDate]',
  providers : [{
    provide: NG_VALIDATORS, 
    useExisting: ValidateDateDirective,
    multi: true
  }]
})
export class ValidateDateDirective implements Validator {
  
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const startDate : Date = control.get('startDate')?.value
    const endDate : Date = control.get('endDate')?.value 

    if ( startDate == null ) return { 'empty' : true }
    if ( endDate == null ) return { 'empty' : true }

    if (startDate.getTime() > endDate.getDate())
      return { 'date' : true }
    return null
  }
}
