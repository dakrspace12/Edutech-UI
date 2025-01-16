import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPichartComponent } from './courses-pichart.component';

describe('CoursesPichartComponent', () => {
  let component: CoursesPichartComponent;
  let fixture: ComponentFixture<CoursesPichartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPichartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesPichartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
