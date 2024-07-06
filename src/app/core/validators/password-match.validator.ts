import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(form: FormGroup) {
  return form.get('password')?.value === form.get('passwordConfirm')?.value
    ? null
    : { mismatch: true };
}
