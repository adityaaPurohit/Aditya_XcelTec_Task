import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  userData: any;

  constructor(
    readonly fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          this.userData = res.data;
          localStorage.setItem('userData', JSON.stringify(this.userData));

          this.loginForm.reset();
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        } else {
          alert('Something went wrong');
        }
      },
      (err: any) => {
        alert(err.error.message);
        this.loginForm.reset();
      }
    );
  }
}
