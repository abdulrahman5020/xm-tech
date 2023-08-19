import { Component, OnInit } from '@angular/core';
import { ImageApiService, Picsum } from '../services/image-api.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  constructor(private imageAPIService: ImageApiService) { }
  images: Picsum[] = [];

  ngOnInit() {
    this.imageAPIService.getImages(2); // get initial images starting with page 2
    this.imageAPIService.imagesLoaded.subscribe(res => {
      if (res) {
        this.images = res;
      }
    });
  }
}
