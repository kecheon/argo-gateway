import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectData } from './projectData';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  projects: ProjectData[] = [];
  displayedColumns: string[] = ['description','domain_id','id'];

  ngOnInit(): void {
    this.http.get<{ projects: ProjectData[] }>('/project').subscribe(
      data => {
        Array.prototype.push.apply(this.projects, data.projects);
        console.log(this.projects)
      },
      err => catchError(err)
    );
  }

}
