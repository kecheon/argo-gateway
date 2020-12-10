import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProjectData } from './projectData';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  getProjects(): Observable<ProjectData[]> {
    return this.http.get<ProjectData[]>('/project');
  }

  getNamespaces(): Observable<ProjectData[]> {
    return this.http.get<ProjectData[]>('/namespace');
  }

  getClusters(): Observable<ProjectData[]> {
    return this.http.get<ProjectData[]>('/cluster');
  }
}
