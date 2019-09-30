//Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Components
import { AuthComponent } from './auth.component';
import { RegistrComponent } from './registr/registr.component';
//Modules
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/modules/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AuthComponent,
    RegistrComponent,
    LoginComponent
  ]
})
export class AuthModule { }
