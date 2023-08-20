import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { picsumMockData } from 'src/mockData/imageMockData';
import { ImageApiService } from './image-api.service';


describe('ImageApiService', () => {
  let service: ImageApiService;
  let http: HttpTestingController;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        MatSnackBarModule,
        Overlay
      ]

    });
    service = TestBed.inject(ImageApiService);
    snackBar = TestBed.inject(MatSnackBar);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get images', (done: DoneFn) => {
    service.imagesLoaded.subscribe(res => {
      if (res.length) {
        expect(res.length).toBe(12);
        done();
      }
    });
    service.getImages(2, []);
    const req = http.expectOne('https://picsum.photos/v2/list?limit=12&page=2');
    expect(req.request.method).toEqual("GET");
    req.flush(picsumMockData);
  });


  it('should store an image to the favorites tab (localstorage)', () => {
    //create a fake local storage service that will override the default localstorage methods
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem); 

    service.storeImage({ id: '13', download_url: 'https://picsum.photos/id/13/2500/1667' });
    const storedImage = localStorage.getItem('storedImages');
    expect(storedImage).toEqual('[{"id":"13","download_url":"https://picsum.photos/id/13/2500/1667"}]');
  });


  it('mat snack bar open is callable', () => {
    expect(snackBar.open('message', 'action')).toBeTruthy();
  });


});
