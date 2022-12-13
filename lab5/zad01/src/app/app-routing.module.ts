import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  { path: "posts", component : PostsComponent },
  { path: "photos", component : PhotosComponent },
  { path: "photo/:id", component : PhotoComponent },
  { path: "", component : HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
