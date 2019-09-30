//Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Components
import { ManagementComponent } from './management.component';
import { BooksPageComponent } from './books-page/books-page.component';
//Modules
import { ManagementRoutingModule } from './management-routing.module';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { MatCardModule } from '@angular/material/card';
import { NgxGalleryModule } from 'ngx-gallery';
import { BooksPageAdminComponent} from './books-page-admin/books-page-admin.component';
import { AdminGuard } from '../core/guards/admin-guard';
import { UserGuard } from '../core/guards/user-guard';
import { EditComponent } from './books-page-admin/edit.component';
import { ShareBookService } from '../shared/services/hareBook.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './books-page-admin/add.component';
import { UsersPageAdminComponent } from './users-page-admin/users-page-admin.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { RouthGuard } from '../core/guards/routh-guard';


@NgModule({
  imports: [
    ManagementRoutingModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    NgxGalleryModule,
    ReactiveFormsModule
  ],
  declarations: [
    ManagementComponent,
    BooksPageComponent,
    GalleryPageComponent,
    BooksPageAdminComponent,
    EditComponent,
    AddComponent,
    UsersPageAdminComponent,
    UserAccountComponent
  ],
  providers: [AdminGuard,UserGuard,ShareBookService, RouthGuard],
  entryComponents: [EditComponent, AddComponent]
})
export class ManagementModule { }
