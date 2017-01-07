import {Directive, OnChanges, SimpleChanges, Input} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl, ValidatorFn, Validators} from "@angular/forms";

export function newNameValidator(namesInUse:string[]): ValidatorFn {
  return (c: AbstractControl): {[key: string]: any} => {
    const name = c.value;
    if (!name) {
      return {'noName': true}
    }
    const yes = namesInUse && namesInUse.indexOf(name.trim()) < 0;
    return yes ? null: {'nameInUse': true};
  };
}

@Directive({
  selector: '[isNewName]',
  providers: [{provide: NG_VALIDATORS, useExisting: IsNewName, multi: true}]
})
export class IsNewName implements Validator, OnChanges {
  @Input('isNewName') namesInUse: string[];
  private valFn = Validators.nullValidator;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['namesInUse'];
    if (change) {
      const val:string[] = change.currentValue;
      this.valFn = newNameValidator(val);
    } else {
      this.valFn=Validators.nullValidator;
    }
  }

  validate(c: AbstractControl): {[p: string]: any} {
    return this.valFn(c);
  }
}
