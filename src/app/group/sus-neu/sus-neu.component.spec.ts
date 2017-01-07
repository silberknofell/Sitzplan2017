/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SusNeuComponent } from './sus-neu.component';

describe('SusNeuComponent', () => {
  let component: SusNeuComponent;
  let fixture: ComponentFixture<SusNeuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SusNeuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SusNeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
