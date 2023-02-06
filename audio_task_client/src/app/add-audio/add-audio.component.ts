import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-add-audio',
  templateUrl: './add-audio.component.html',
  styleUrls: ['./add-audio.component.css']
})
export class AddAudioComponent {
  fileNameMP3 = '';
  fileNameimage = '';
  audio: any;
  image: any;
  trackForm!: FormGroup;
  userData: any;
  routeId: any;
  isEditUrl: boolean = false;
  constructor(
    private http: HttpClient,
    readonly fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    let routeUrl: string = router.url;
    this.isEditUrl = routeUrl.includes('edit-audio');
  }

  onImageFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.image = file;
      this.fileNameimage = file.name;

      const formData = new FormData();

      formData.append('image', file);
    }
  }

  onMP3FileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.audio = file;

      this.fileNameMP3 = file.name;

      const formData = new FormData();

      formData.append('audio', file);
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.routeId = params.id;
    });
    this.trackForm = this.fb.group({
      song_name: ['', Validators.required],
      discription: ['', Validators.required]
    });
  }

  addTrack() {
    const formData = new FormData();
    formData.append('image', this.image);
    formData.append('audio', this.audio);
    formData.append('song_name', this.trackForm.value.song_name);
    formData.append('discription', this.trackForm.value.discription);

    this.authService.addAudio(formData).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.trackForm.reset();

          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
          alert('track Uloaded successfully');
        } else {
          alert('Something went wrong');
        }
      },
      (err: any) => {
          alert(err.error.message);
          this.trackForm.reset();
        }
    );
  }

  editTrack() {
    const formData = new FormData();
    if (this.image) formData.append('image', this.image);
    if (this.audio) formData.append('audio', this.audio);
    if (this.trackForm.value.song_name)
      formData.append('song_name', this.trackForm.value.song_name);
    if (this.trackForm.value.discription)
      formData.append('discription', this.trackForm.value.discription);
    formData.append('id', this.routeId);
    this.authService.addAudio(formData).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.trackForm.reset();

          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
          alert('track Updated successfully');
        } else {
          alert('Something went wrong');
        }
      },
      (err: any) => {
          alert(err.error.message);
          this.trackForm.reset();
      }
    );
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(["sign-in"])
  }
}
