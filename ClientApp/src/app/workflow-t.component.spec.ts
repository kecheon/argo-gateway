import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTComponent } from './workflow-t.component';

describe('WorkflowTComponent', () => {
  let component: WorkflowTComponent;
  let fixture: ComponentFixture<WorkflowTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
