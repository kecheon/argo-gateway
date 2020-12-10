import { Component, OnInit } from '@angular/core';
import { UserData } from './userData';
import { UserService } from './user.service';

@Component({
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.sass']
})
export class WorkflowsComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  accountUser: UserData = new UserData();

  ngOnInit(): void {
    this.userService.getAccountUser().subscribe(
      data => this.accountUser = data,
      err => console.log(err)
    );
  }
}
