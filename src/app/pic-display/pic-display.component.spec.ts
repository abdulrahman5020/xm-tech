import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { picsumMockData } from 'src/mockData/imageMockData';
import { ChangeImageSizePipe } from '../change-image-size.pipe';

import { PicDisplayComponent } from './pic-display.component';

describe('PicDisplayComponent', () => {
  let component: PicDisplayComponent;
  let fixture: ComponentFixture<PicDisplayComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PicDisplayComponent, ChangeImageSizePipe],
      imports: [HttpClientTestingModule, MatSnackBarModule]
    });
    fixture = TestBed.createComponent(PicDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the image list', () => {

    component.images = picsumMockData;
    fixture.detectChanges();
    const images = el.queryAll(By.css(".picContainer img"));
    expect(images).toBeTruthy();
    expect(images.length).toBe(12);

  });
});
