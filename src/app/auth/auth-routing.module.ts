//Vendors
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//Components
import { AuthComponent } from './auth.component';
import { RegistrComponent } from './registr/registr.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'register', component: RegistrComponent},
      {path : "login", component: LoginComponent},
      {path: "**",
    redirectTo:'login'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

