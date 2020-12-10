import { Component, Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    template: `
                <h3 mat-dialog-title>{{data}}</h3>
                <div mat-dialog-content>Return to home.</div>
                <div mat-dialog-actions>
                <button mat-button mat-dialog-close>Confirm</button>
                </div>
              `
})
export class ErrorDialog {
    constructor( @Inject(MAT_DIALOG_DATA) public data: string) { }
}

@Injectable()
export class ErrorAlert {
    constructor(private dialog: MatDialog,
        private router: Router) {
    }

    open(msg?: string) {
        this.dialog.open(ErrorDialog, {
            data: msg ? msg : 'Error!'
        }).afterClosed()
            .subscribe(() => this.router.navigate(['/']));
    }
}
