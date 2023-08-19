import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ImageApiService, Picsum } from '../services/image-api.service';


@Component({
  selector: 'app-pic-display',
  templateUrl: './pic-display.component.html',
  styleUrls: ['./pic-display.component.scss'],
})
export class PicDisplayComponent implements OnInit {
  @Input() images: Picsum[] = [];
  @Input() scrollEnabled: boolean = false;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  disableScrollDown = false;
  pageNumber: number = 2; //starting from page 2 to avoid repetitive macbook images in page 1
  isLoading = false;
  storedImages: Picsum[] = [];

  constructor(private imageApiService: ImageApiService) { }


  ngOnInit(): void {
    //add types to res and images
    // move this to a service which calls the photos list
    // add params
    // this.images = this.imageApiService.getImages(this.pageNumber, this.images);
  }

  onScroll() {
    let element = this.myScrollContainer.nativeElement
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
    if (atBottom && !this.isLoading && this.scrollEnabled) {
      console.log('at bottom');
      // this.isLoading = true;
      this.pageNumber++;
      this.imageApiService.getImages(this.pageNumber,this.images);
    }
  }



  storeImage(img: any) {
    this.imageApiService.storeImage(img);
  }

}
