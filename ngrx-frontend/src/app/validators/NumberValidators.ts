import { AbstractControl } from "@angular/forms";

export class NumberValidators {
  static intBetween (min: number, max: number) { 
    return (c: AbstractControl): {[key: string]: boolean} | null => {
      if (!(
        c.value !== null && 
        !isNaN(c.value) && 
        Number.isInteger(+c.value) &&
        +c.value >= min &&
        +c.value <= max
      )) {
        return {'intBetween': true};
      }
      return null;
    }
  }
}