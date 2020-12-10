import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Login } from './login';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home.component';
import { ProjectService } from './project.service';
import { WorkflowsComponent } from './workflows.component';
import { WorkflowTComponent } from './workflow-t.component';
import { CWorkflowTComponent } from './c-workflow-t.component';
import { MaterialModule } from './material.module';
import {LoggedIn,NotLoggedIn } from './check-login';
import { UsermanagerComponent } from './usermanager.component';
import { ConfirmDialog, ConfirmDialogTemplate, ConfirmDialogTemplate2 } from './confirm.dialog';
import { ErrorAlert, ErrorDialog } from './error.alert';
import { UserService } from './user.service';
import { NotfoundComponent } from './notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    HomeComponent,
    WorkflowsComponent,
    WorkflowTComponent,
    CWorkflowTComponent,
    UsermanagerComponent,
    NotfoundComponent,
    ConfirmDialogTemplate,
    ConfirmDialogTemplate2,
    ErrorDialog
  ],
  entryComponents: [
    ConfirmDialogTemplate,
    ConfirmDialogTemplate2,
    ErrorDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ProjectService, LoggedIn, NotLoggedIn, ErrorAlert, ConfirmDialog,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
