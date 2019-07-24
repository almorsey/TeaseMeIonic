import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeasePage } from './new-tease.page';

describe('NewTeasePage', () => {
  let component: NewTeasePage;
  let fixture: ComponentFixture<NewTeasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTeasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTeasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
