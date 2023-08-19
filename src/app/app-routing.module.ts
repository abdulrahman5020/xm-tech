import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { PhotosComponent } from './photos/photos.component';

const routes: Routes = [
  { path: '', component: PhotosComponent },
  { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
