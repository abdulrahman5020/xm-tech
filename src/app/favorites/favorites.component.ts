import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  storedImages: any = []

  ngOnInit(): void {
    console.log('favorite on')
    const images = localStorage.getItem("storedImages");
    if (images) {
      this.storedImages = JSON.parse(images);
    }
  }
}
