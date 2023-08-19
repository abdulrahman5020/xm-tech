import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ImageApiService, Picsum } from '../services/image-api.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, OnDestroy {
  constructor(private imageAPIService: ImageApiService) { }
  unsubscribe: Subject<void> = new Subject();
  images: Picsum[] = [];

  ngOnInit() {
    this.imageAPIService.getImages(2); // get initial images starting with page 2 from the picsum api
    this.imageAPIService.imagesLoaded.pipe(
      takeUntil(this.unsubscribe))
      .subscribe(res => {// listen to imagesLoaded subject
        if (res) {
          this.images = res;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
