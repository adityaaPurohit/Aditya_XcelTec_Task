import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signinForm!: FormGroup;
  userData: any;

  constructor(
    readonly fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    console.log(this.signinForm.value);
    this.authService.register(this.signinForm.value).subscribe(
      (res: any) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);

          localStorage.setItem('userData', JSON.stringify(this.userData));
          alert('User registered successfully!!');
          this.signinForm.reset();

          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 1000);
        } else {
          alert('Something went wrong');

          // this.toastr.error('Error', 'Something went wrong');
        }
      },
      (err: any) => {
        alert(err.error.message);
        this.signinForm.reset();
      }
    );
  }
}
