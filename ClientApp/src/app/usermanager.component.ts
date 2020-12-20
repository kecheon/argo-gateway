import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorAlert } from './error.alert';
import { UserService } from './user.service';
import { UserData } from './userData';
import {UserDialog} from './user.dialog';
import {ConfirmDialog} from './confirm.dialog';


@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.sass']
})
export class UsermanagerComponent implements OnInit {

  constructor(
    private dialog:MatDialog,
    private errorAlert:ErrorAlert,
    private confirmDialog:ConfirmDialog,
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
    this.dialog.open(UserDialog).afterClosed().subscribe(user=>{
      if(user)
        this.userService.createUser(user).subscribe(
          id=>{
            user.id=id;
            this.users.push(user);
          },
          err=>this.errorAlert.open(err)
        );
    });
  }

  editUser(id:number){
    this.dialog.open(UserDialog)
  }

  deleteUser(id:number){
    //this.userService.deleteUser(this.users[id].id)
    this.confirmDialog.open('sorry, delete feature is not yet');
  }

}
