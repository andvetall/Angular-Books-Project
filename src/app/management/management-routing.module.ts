//Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { ManagementComponent } from './management.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { BooksPageAdminComponent } from './books-page-admin/books-page-admin.component';
import { AdminGuard } from '../core/guards/admin-guard';
import { UserGuard } from '../core/guards/user-guard';
import { UsersPageAdminComponent } from './users-page-admin/users-page-admin.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { RouthGuard } from '../core/guards/routh-guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'management',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ManagementComponent,
    children: [
      { path: 'books', component: BooksPageComponent, canActivate:[UserGuard]},
      { path: 'gallery', component: GalleryPageComponent, canActivate:[UserGuard]},
      { path: 'books-admin', component: BooksPageAdminComponent, canActivate:[AdminGuard]},
      { path: 'users-admin', component: UsersPageAdminComponent, canActivate:[AdminGuard]},
      { path: 'user-account', component: UserAccountComponent, canActivate:[RouthGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ManagementRoutingModule { }
