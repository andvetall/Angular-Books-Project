//Vendors
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';
//Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module';
//Components
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RouthGuard } from '../core/guards/routh-guard';
import { LoginGuard } from '../core/guards/login-guard';
import { AvatarModule } from 'ngx-avatar';

const COMPONENTS = [
  MainLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ToastContainerModule,
    MatSidenavModule,
    AvatarModule,
  ],
  providers: [RouthGuard, LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
