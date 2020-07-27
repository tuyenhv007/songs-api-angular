import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ISong} from "../../isong";
import {ActivatedRoute, Router} from "@angular/router";
import {SongService} from "../../services/song.service";

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
  editForm: FormGroup;
  song: ISong;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ) {
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      singer: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lyric: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      category: ['', [Validators.required]]
    });
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.songService.getSongById(id).subscribe(next => {
      this.song = next;
      this.editForm.patchValue(this.song)
    }, error => {
      console.log(error);
      this.song = null;
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const {value} = this.editForm;
      const data = {
        ...this.song,
        ...value
      };
      this.songService.updateSong(data).subscribe(next => {
        this.router.navigate(['']);
      }, error => {
        console.log(error);
      });
    }
  }

  get name() {
    return this.editForm.get('name');
  }

  get singer() {
    return this.editForm.get('singer');
  }

  get lyric() {
    return this.editForm.get('lyric');
  }

  get category() {
    return this.editForm.get('category');
  }

}
