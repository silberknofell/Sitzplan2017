/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlanTitelComponent } from './plan-titel.component';

describe('PlanTitelComponent', () => {
  let component: PlanTitelComponent;
  let fixture: ComponentFixture<PlanTitelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTitelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTitelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
