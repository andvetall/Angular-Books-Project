import {Component, OnInit, ViewChild, OnChanges, DoCheck, ChangeDetectorRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { BooksService } from 'src/app/shared/services/books.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { EditComponent } from './edit.component';
import { ShareBookService } from 'src/app/shared/services/hareBook.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { AddComponent } from './add.component';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'books-page-admin.component',
  styleUrls: ['books-page-admin.component.scss'],
  templateUrl: 'books-page-admin.component.html',
  providers: [CommonService]
})
export class BooksPageAdminComponent implements OnInit{
  private bookToPass: any = {}
  private booksData: any[]
  displayedColumns: string[] = ['title', 'amount', 'price', 'description', 'img', '_id', 'edit'];
  dataSource = new MatTableDataSource<any>(this.booksData);
  constructor(
    private _booksService: BooksService,
    private _bottomSheet: MatBottomSheet,
    private _shareBookServise: ShareBookService,
    private changeDetection: ChangeDetectorRef
    ) {
      this._booksService.updateBooksData$.subscribe(res => {
        this._booksService.getBooks().subscribe(books => {
          this.booksData = books
        })
      })
      this._booksService.addBooksData$.subscribe(res => {
        this._booksService.getBooks().subscribe(books => {
          this.booksData = books
        })
      })
      this._booksService.getBooks().subscribe(books => {
            this.booksData = books
      })
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit() {
   this.dataSource.paginator = this.paginator
  }
  passBookData(id){
    this._shareBookServise.passBook(this.booksData.find(book => book._id == id))
  }
  openEditBottomSheet(){
    this._bottomSheet.open(EditComponent);
  }
  openAddBottomSheet(){
    this._bottomSheet.open(AddComponent);
  }
  
}



