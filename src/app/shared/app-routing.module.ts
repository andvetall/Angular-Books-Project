//Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RouthGuard } from '../core/guards/routh-guard';
import { LoginGuard } from '../core/guards/login-guard';


const routes: Routes = [
  {
    path: 'auth',
    component: MainLayoutComponent,
    loadChildren: () => import('src/app/auth/auth.module').then((a) => a.AuthModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'management',
    component: MainLayoutComponent,
    loadChildren: () => import('src/app/management/management.module').then(({ManagementModule}) => ManagementModule),
    canActivate: [RouthGuard],
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
