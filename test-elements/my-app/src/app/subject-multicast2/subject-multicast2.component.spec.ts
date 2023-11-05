import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMulticast2Component } from './subject-multicast2.component';

describe('SubjectMulticast2Component', () => {
  let component: SubjectMulticast2Component;
  let fixture: ComponentFixture<SubjectMulticast2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectMulticast2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectMulticast2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
