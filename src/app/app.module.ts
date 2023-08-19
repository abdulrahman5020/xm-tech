import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PhotosComponent } from './photos/photos.component';
import { MatButtonModule } from '@angular/material/button';
import { PicDisplayComponent } from './pic-display/pic-display.component';
import { ChangeImageSizePipe } from './change-image-size.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PhotosComponent,
    PicDisplayComponent,
    ChangeImageSizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
