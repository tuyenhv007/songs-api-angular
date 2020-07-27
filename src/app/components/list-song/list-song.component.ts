import {Component, OnInit} from '@angular/core';
import {ISong} from "../../isong";
import {SongService} from "../../services/song.service";

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.css']
})
export class ListSongComponent implements OnInit {
  listSong: ISong[] = [];
  listSongFind: ISong[];

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.songService.getSong().subscribe(
      next => {
        this.listSong = next;
        this.listSongFind = this.listSong;
      },
    );
  }

  deleteSong(index) {
    const song = this.listSongFind[index];
    this.songService.deleteSong(song.id).subscribe(next => (
      this.listSongFind = this.listSongFind.filter(name => name.id !== song.id))
    )
  }

  searchKeyword(event: any) {
    let keyword = event.target.value.toLowerCase();
    this.listSongFind = (keyword) ? this.filterByKeyword(keyword) : this.listSong;
    console.log(this.listSongFind);
  }

  filterByKeyword(keyword: string) {
    return this.listSong.filter(song => {
      return song.name.toLowerCase().indexOf(keyword) != -1;
    });
  }

}
