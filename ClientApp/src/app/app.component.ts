import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserData } from './userData';
import { catchError } from 'rxjs/operators';
import { ConfirmDialog } from './confirm.dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private confirmDialog: ConfirmDialog
  ) {
    if (window.outerWidth < 800) {
      this.sidenavMode = 'over';
      this.isOpened = false;
    }
  }
  title = 'Argo UI App';

  isOpened: boolean = true;
  sidenavMode: 'side' | 'over' | 'push' = 'side';

  user: UserData;

  handleMenu(sidemenu: any) {
    if (window.outerWidth < 800)
      sidemenu.close();
  }

  ngOnInit() {
    this._userService.getAccountUser()
      .subscribe(data => this.user = data,
        err =>catchError(err));
  }

  showAccountInfo() {
    this.confirmDialog.open([
      'id: ' + this.user.id,
      'name: ' + this.user.name,
      'primary namespace: ' + this.user.primary_namespace_name
      ]
    );
  }
}
