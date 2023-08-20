import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, delay, Observable } from 'rxjs';

export interface Picsum {
  id: string,
  download_url: string
}

@Injectable({
  providedIn: 'root'
})


export class ImageApiService {

  imagesLoaded: BehaviorSubject<Picsum[] | any> = new BehaviorSubject([]); // current loaded images from the picsum api
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false); // boolean to indicate api loading


  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) { }

  getImages(pageNumber: number, images?: Picsum[]): any {// get images from the picsum api and update the subject
    this.isLoading.next(true);
    this._http.get<Picsum[]>(`https://picsum.photos/v2/list?limit=12&page=${pageNumber}`).pipe(
      (delay(Math.floor(Math.random() * 1000))) // add a random delay to the api result
    ).subscribe(res => {
      if (res) {
        const previousData = images ?? []; // add new data to previous data if previous data exists
        previousData.push(...res);
        this.imagesLoaded.next(previousData);
        this.isLoading.next(false);
      }
    }, (err) => {
      console.log(err);
      this.openSnackBar("Something went wrong", "Close");
    })
  }

  storeImage(image: Picsum) {//store an image in the local storage so that the favorites component can access it later
    const images = localStorage.getItem("storedImages");
    if (images) {// if any data exists in the local storage
      const imagesArray = JSON.parse(images);
      if (!imagesArray.some((e: any) => e.id === image.id)) { // check if the image is already added to the favorites
        imagesArray.push({ id: image.id, download_url: image.download_url })
        localStorage.setItem("storedImages", JSON.stringify(imagesArray))
        this.openSnackBar("Image added to favorites successfully.", "Close");
      } else {//show snack bar to tell the user it already exists
        this.openSnackBar("Image already exists in favorites.", "Close");
      }
    } else {
      localStorage.setItem("storedImages", JSON.stringify([{ id: image.id, download_url: image.download_url }]))
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
