import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddAudioComponent } from './add-audio/add-audio.component';
import { LogedinGuard } from './auth/auth-guard/logedin.guard';
import { AuthGuardGuard } from './auth/auth-guard/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent },
  {
    path: 'sign-up',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'add-audio',
    component: AddAudioComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'edit-audio/:id',
    component: AddAudioComponent,
    canActivate: [AuthGuardGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      paramsInheritanceStrategy: 'always',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
