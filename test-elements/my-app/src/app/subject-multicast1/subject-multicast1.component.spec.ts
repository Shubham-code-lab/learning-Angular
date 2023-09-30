import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMulticast1Component } from './subject-multicast1.component';

describe('SubjectMulticast1Component', () => {
  let component: SubjectMulticast1Component;
  let fixture: ComponentFixture<SubjectMulticast1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectMulticast1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectMulticast1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
