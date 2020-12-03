import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'user-dialog',
  templateUrl: './user.dialog.html'
})
export class UserDialog {
  name_re = /^[a-z0-9]+(\-[a-z0-9]?[a-z0-9]*/;
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.pattern(this.name_re)]);

  getEmailErrorMsg() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    else
      return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getNameErrorMsg() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    else
      return this.name.hasError('pattern') ?
        'Not a valid name(only use lower case alphabet and numeric)' : '';
  }
}
