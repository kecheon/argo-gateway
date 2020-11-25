import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectData } from './projectData';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit {

  constructor(
    private http: HttpClient
  ) { }

  projectDatabase: ProjectDatabase|null = null;
  displayedColumns: string[] = ['description', 'domain_id', 'id'];
  isLoading: boolean = true;
  projects: ProjectData[] = [];

  ngAfterViewInit() {
    this.projectDatabase = new ProjectDatabase(this.http);
    this.projectDatabase.getProjects().subscribe(data => 
      this.projects = data.projects,
      err => catchError(err));
  }

  testToken() {
    this.http.get<string>('/user').subscribe(msg => console.log(msg),
      err => catchError(err));
  }

}

class ProjectDatabase {
  constructor(
    private http: HttpClient
  ) { }

  getProjects(): Observable<{ projects: ProjectData[] }> {
    return this.http.get<{ projects: ProjectData[] }>('/project');
  }
}
