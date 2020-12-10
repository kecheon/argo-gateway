import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserData } from './userData';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(
    private _userService: UserService
  ) {
    if (window.outerWidth < 800) {
      this.sidenavMode = 'over';
      this.isOpened = false;
    }
  }
  title = 'Argo UI App';

  isOpened: boolean = true;
  sidenavMode: 'side' | 'over' | 'push' = 'side';

  user: {
    name: string
  } = {name:''};

  handleMenu(sidemenu: any) {
    if (window.outerWidth < 800)
      sidemenu.close();
  }

  ngOnInit() {
    this._userService.getAccountUser()
      .subscribe(data => this.user.name = data.name, err => {
        this.user = { name: '' };
        catchError(err);
      });
  }
}
