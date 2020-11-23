import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CWorkflowTComponent } from './c-workflow-t.component';

describe('CWorkflowTComponent', () => {
  let component: CWorkflowTComponent;
  let fixture: ComponentFixture<CWorkflowTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CWorkflowTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CWorkflowTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
