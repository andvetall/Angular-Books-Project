import {Component, OnInit, ViewChild, OnChanges, DoCheck, ChangeDetectorRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UsersService } from 'src/app/shared/services/users.service';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'users-page-admin.component',
  styleUrls: ['users-page-admin.component.scss'],
  templateUrl: 'users-page-admin.component.html',
})
export class UsersPageAdminComponent implements OnInit{
  private usersData: any[]
  displayedColumns: string[] = ['_id', 'email', 'login', 'website', 'img', 'mobile', 'delete'];
  dataSource = new MatTableDataSource<any>(this.usersData);
  constructor(
    private _usersService: UsersService,
    ) {
        this._usersService.getUsers().subscribe(users => this.usersData = users.users) 
      }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit() {
   this.dataSource.paginator = this.paginator
  }
  moveUser(id){
    this._usersService.moveUser(id).subscribe(e => e)
  }
  
}



