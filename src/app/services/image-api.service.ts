import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Picsum {
  id: string,
  download_url: string
}

@Injectable({
  providedIn: 'root'
})


export class ImageApiService {

  imagesLoaded: BehaviorSubject<Picsum[] | any> = new BehaviorSubject([]);


  constructor(private _http: HttpClient) { }

  getImages(pageNumber: number, images?: Picsum[]) {
    this._http.get<Picsum[]>(`https://picsum.photos/v2/list?limit=12&page=${pageNumber}`).subscribe(res => {
      if (res) {
        const previousData = images ?? [];
        previousData.push(...res);
        this.imagesLoaded.next(previousData);
      }
    })
  }

  storeImage(image: Picsum) {
    const images = localStorage.getItem("storedImages");
    if (images) {
      const imagesArray = JSON.parse(images);
      if (!imagesArray.some((e: any) => e.id === image.id)) {
        imagesArray.push({ id: image.id, download_url: image.download_url })
        localStorage.setItem("storedImages", JSON.stringify(imagesArray))
      } else {
        console.log('already exists') // show message
      }
    } else {
      localStorage.setItem("storedImages", JSON.stringify([{ id: image.id, download_url: image.download_url }]))
    }
  }
}
