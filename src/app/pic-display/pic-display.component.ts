import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ImageApiService, Picsum } from '../services/image-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pic-display',
  templateUrl: './pic-display.component.html',
  styleUrls: ['./pic-display.component.scss'],
})
export class PicDisplayComponent implements OnInit {
  @Input() images: Picsum[] = []; // images to be displayed in the grid
  @Input() scrollEnabled: boolean = false; //enable or disable loading of more items via api on scroll
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  pageNumber: number = 2; //starting from page 2 to avoid repetitive macbook images in page 1 of picsum
  isLoading: boolean = false; // variable to indicate loading

  constructor(private imageApiService: ImageApiService, private router: Router) { }


  ngOnInit(): void {
    this.imageApiService.isLoading.subscribe(res => {// listen to isLoading subject
      this.isLoading = res;
    });
  }

  onScroll() {//if scroll reaches bottom of the grid load more images
    const element = this.myScrollContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight; // check if user has scrolled to the bottom 
    if (atBottom && !this.isLoading) {
      console.log('at bottom');
      this.pageNumber++; //increment the page number to get the next page items
      this.imageApiService.getImages(this.pageNumber, this.images);
    }
  }



  imageClicked(img: any) {// store images to the localstorage if they are clicked in the photos view else navigate to single photo view
    if (this.scrollEnabled) {
      this.imageApiService.storeImage(img);
    } else {
      this.router.navigate([`favorites`], { queryParams: { id: img.id } })
    }
  }

}
