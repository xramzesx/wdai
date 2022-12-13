import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { PhotoItemComponent } from './pages/photos/photo-item/photo-item.component';
import { IndicatorComponent } from './common/indicator/indicator.component';
import { PostItemComponent } from './pages/posts/post-item/post-item.component';
import { PhotoComponent } from './pages/photo/photo.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PhotosComponent,
    HomeComponent,
    PhotoItemComponent,
    IndicatorComponent,
    PostItemComponent,
    PhotoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
