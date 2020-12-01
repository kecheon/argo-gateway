import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login } from './login';
import { HomeComponent } from './home.component';
import { CWorkflowTComponent } from './c-workflow-t.component';
import { WorkflowTComponent } from './workflow-t.component';
import { WorkflowsComponent } from './workflows.component';
import { UsermanagerComponent } from './usermanager.component';

import { LoggedIn, NotLoggedIn, IsAdmin } from './check-login';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [LoggedIn]
  },
  {
    path: 'login', component: Login,
    canActivate: [NotLoggedIn]
  },
  {
    path: 'workflows', component: WorkflowsComponent,
    canActivate: [LoggedIn]
  },
  {
    path: 'workflow-templates', component: WorkflowTComponent,
    canActivate: [LoggedIn]
  },
  {
    path: 'cluster-workflow-templates', component: CWorkflowTComponent,
    canActivate: [LoggedIn]
  },
  {
    path: 'user-manager', component: UsermanagerComponent,
    canActivate: [IsAdmin]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
