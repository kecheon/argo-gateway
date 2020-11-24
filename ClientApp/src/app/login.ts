import { Component, OnInit,Input } from '@angular/core';

@Component({
  templateUrl: './login.html',
  styleUrls: ['./login.sass']
})
export class Login implements OnInit {

  constructor() { }

  username: string = '';
  password: string = '';


  ngOnInit(): void {
  }

  resetId(): void {
    this.username = '';
    this.password = '';
  }

}
