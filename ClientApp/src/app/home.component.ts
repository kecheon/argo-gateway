import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectData } from './projectData';
import { ProjectService } from './project.service';
import { ErrorAlert } from './error.alert';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit {

  constructor(
    private projectService: ProjectService,
    private errorAlert: ErrorAlert
  ) { }

  projectDatabase: ProjectDatabase|null = null;
  displayedColumns: string[] = ['description', 'domain_id', 'id','name'];
  isLoading: boolean = true;
  namespaces: ProjectData[] = [];
  clusters: ProjectData[] = [];

  ngAfterViewInit() {
    this.projectDatabase = new ProjectDatabase(this.projectService);
    this.projectDatabase.getNamespaces().subscribe(data =>
      this.namespaces = data,
      err => this.errorAlert.open(err));
    this.projectDatabase.getClusters().subscribe(data =>
      this.clusters = data,
      err => this.errorAlert.open(err));
  }
}

class ProjectDatabase {
  constructor(
    private projectService: ProjectService
  ) { }

  getNamespaces(): Observable<ProjectData[]> {
    return this.projectService.getNamespaces();
  }

  getClusters(): Observable<ProjectData[]> {
    return this.projectService.getClusters();
  }
}
