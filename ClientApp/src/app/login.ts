import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.sass']
})
export class Login implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  username: string = '';
  password: string = '';


  ngOnInit(): void {
  }

  resetId(): void {
    this.username = '';
    this.password = '';
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Username required.';
    }
    else
      return this.email.hasError('email') ? 'Not a valid E-mail' : '';
  }
}
