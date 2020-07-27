import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ISong} from "../../isong";
import {SongService} from "../../services/song.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  addForm: FormGroup;
  songList: ISong[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private songService: SongService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      singer: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lyric: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      category: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      const {value} = this.addForm;
      this.songService.createSong(value).subscribe(next => {
        this.songList.unshift(next);
        this.addForm.reset();
      }, error => {
        console.log(error);
        this.router.navigate(['']);
      });
    }
  }

  get name() {
    return this.addForm.get('name');
  }

  get singer() {
    return this.addForm.get('singer');
  }

  get lyric() {
    return this.addForm.get('lyric');
  }

  get category() {
    return this.addForm.get('category');
  }

}
