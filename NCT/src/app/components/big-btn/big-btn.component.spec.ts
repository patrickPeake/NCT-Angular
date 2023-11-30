import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBtnComponent } from './big-btn.component';

describe('BigBtnComponent', () => {
  let component: BigBtnComponent;
  let fixture: ComponentFixture<BigBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BigBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BigBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
