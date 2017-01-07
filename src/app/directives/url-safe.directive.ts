import {Directive, OnChanges, SimpleChanges} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, Validators} from "@angular/forms";

export function newNameValidator(): ValidatorFn {
  return (c: AbstractControl): {[key: string]: any} => {
    const REGEXP :RegExp = /^[A-Za-z0-9 -]+$/g;
    const name = c.value;
    if (!name) {
      return {'noName': true}
    }
    const yes = REGEXP.test(name);
    return yes ? null: {'illegalCharacter': true};
  };
}
@Directive({
  selector: '[urlSafe]',
  providers: [{provide: NG_VALIDATORS, useExisting: UrlSafeDirective, multi: true}]
})
export class UrlSafeDirective implements Validator, OnChanges {
  private valFn = newNameValidator();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.valFn = newNameValidator();
  }

  validate(c: AbstractControl): {[p: string]: any} {
    return this.valFn(c);
  }
}
