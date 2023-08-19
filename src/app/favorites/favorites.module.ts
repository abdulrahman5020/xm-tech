import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { ChangeImageSizePipe } from '../change-image-size.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        SharedModule
    ],
    declarations: [
        FavoritesComponent,
    ]
})
export class FavoritesModule { }