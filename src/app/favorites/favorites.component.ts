import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageApiService, Picsum } from '../services/image-api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  storedImages: Picsum[] = []
  paramsId: any;
  singleImage: Picsum = { id: "", download_url: "" };

  constructor(
    private route: ActivatedRoute,
    private imageAPIService: ImageApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const images = localStorage.getItem("storedImages");
    if (images) {// if favorite images exist then load them to the view
      this.storedImages = JSON.parse(images);
    }

    this.route.queryParams.subscribe((params: any) => {//check route params to see if any image was clicked in the favorites view
      this.paramsId = params.id;
      if (this.paramsId) {// store it in singleImage variable
        this.singleImage = this.storedImages.find((item: Picsum) => item.id == params.id) ?? { id: '', download_url: '' };
      }
    });
  }

  removeFromFavorite() {//remove an image from the favorites using its id
    this.storedImages = this.storedImages.filter(item => item.id !== this.singleImage.id);
    localStorage.setItem("storedImages", JSON.stringify(this.storedImages));
    this.imageAPIService.openSnackBar("Image removed successfully", "Close");
    this.router.navigate([`favorites`])
  }
}
