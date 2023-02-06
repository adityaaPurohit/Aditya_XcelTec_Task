import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  audioList: any = [];
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getAudio();
  }

  getAudio() {
    this.authService.getAudio().subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.audioList = res.data;
          console.log('>>>', this.audioList);
        } else {
          alert('Something went wrong');
        }
      },
      (err: any) => {
          alert(err.error.message);
        }
    );
  }

  onDeleteTrack(id: any) {
    this.authService.deleteAudio({ id: id }).subscribe(
      (res: any) => {
        if (res.status === 200) {
          alert('Track deleted successfully');
          window.location.reload();
        } else {
          alert('Something went wrong');
        }
      },
      (err: any) => {
          alert(err.error.message);
      }
    );
  }

  onEditTrack(value?: any) {
    this.router.navigate(['edit-audio', value]);
  }

  logOut(){
    localStorage.clear()
    this.router.navigate(["sign-in"])
  }
}
