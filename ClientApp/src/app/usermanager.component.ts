import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorAlert } from './error.alert';
import { UserService } from './user.service';
import { UserData } from './userData';
import {UserDialog} from './user.dialog';


@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.sass']
})
export class UsermanagerComponent implements OnInit {

  constructor(
    private dialog:MatDialog,
    private errorAlert:ErrorAlert,
    private userService:UserService
  ) { }

  users:UserData[];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users=>this.users=users,
      err=>this.errorAlert.open(err)
    );
  }

  createUser(){
    this.dialog.open(UserDialog)
  }

  editUser(id:number){
    this.dialog.open(UserDialog)
  }

}
