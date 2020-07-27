import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListSongComponent} from "./components/list-song/list-song.component";
import {EditSongComponent} from "./components/edit-song/edit-song.component";
import {AddSongComponent} from "./components/add-song/add-song.component";


const routes: Routes = [
  {path: '', component: ListSongComponent},
  {path: 'song/add', component: AddSongComponent},
  {path: 'song/edit/:id', component: EditSongComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
