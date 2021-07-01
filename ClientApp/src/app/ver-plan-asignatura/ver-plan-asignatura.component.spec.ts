import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPlanAsignaturaComponent } from './ver-plan-asignatura.component';

describe('VerPlanAsignaturaComponent', () => {
  let component: VerPlanAsignaturaComponent;
  let fixture: ComponentFixture<VerPlanAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPlanAsignaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPlanAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
