import { NgModule } from '@angular/core';
import { PicDisplayComponent } from '../pic-display/pic-display.component';
import { ChangeImageSizePipe } from '../change-image-size.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ChangeImageSizePipe,
    PicDisplayComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  exports: [
    ChangeImageSizePipe,
    PicDisplayComponent,
    MatProgressSpinnerModule,
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 4000}}
  ]
})
export class SharedModule { }
