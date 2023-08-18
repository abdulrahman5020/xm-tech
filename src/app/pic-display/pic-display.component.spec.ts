import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicDisplayComponent } from './pic-display.component';

describe('PicDisplayComponent', () => {
  let component: PicDisplayComponent;
  let fixture: ComponentFixture<PicDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PicDisplayComponent]
    });
    fixture = TestBed.createComponent(PicDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
