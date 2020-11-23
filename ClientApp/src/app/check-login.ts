import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class NotLoggedIn implements CanActivate {
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.http.get('/account/notLoggedIn', { responseType:'text' })
      .pipe(map(res => true),
        catchError(err => {
          if (err.status == 400) return this.router.navigate(['/']);
          else return of(err);
      }));
  }
}

@Injectable()
export class LoggedIn implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.http.get('/account/checkLogin', { responseType:'text' })
      .pipe(map(res => true), catchError(err => {
        if (err.status != 401) return of(err);
        else return this.router.navigate(['/login']);
      }));
  }
}
