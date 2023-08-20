import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { picsumMockData } from 'src/mockData/imageMockData';
import { ImageApiService } from '../services/image-api.service';

import { FavoritesComponent } from './favorites.component';
import { FavoritesModule } from './favorites.module';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let service: ImageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FavoritesModule,
        RouterTestingModule.withRoutes([
          { path: 'favorites', component: FavoritesComponent }
        ]),
        HttpClientTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      declarations: [FavoritesComponent]
    });
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ImageApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove item from favorites (localStorage)', () => {
    //create a fake local storage service that will override the default localstorage methods
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);

    component.storedImages = picsumMockData;
    component.singleImage = { id: "12", download_url: "" }

    component.removeFromFavorite();
    expect(component.storedImages.length).toBe(11);
    const index = component.storedImages.findIndex(item => item.id == component.singleImage.id);
    expect(index).toBe(-1);
    let storedImagesLocal = localStorage.getItem("storedImages");
    if (storedImagesLocal) {// if favorite images exists then check their length
      storedImagesLocal = JSON.parse(storedImagesLocal);
      expect(storedImagesLocal?.length).toBe(11);
    }
  });

});
