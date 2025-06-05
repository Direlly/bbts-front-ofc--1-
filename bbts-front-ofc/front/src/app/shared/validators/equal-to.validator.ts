import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[equalTo]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EqualToValidatorDirective),
    multi: true
  }]
})
export class EqualToValidatorDirective implements Validator {
  @Input('equalTo') controlToCompare: any;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.controlToCompare || control.value !== this.controlToCompare) {
      return { 'equalTo': true };
    }
    return null;
  }
}