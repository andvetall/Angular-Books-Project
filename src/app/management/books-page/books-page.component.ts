//Vendors
import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {
  private searchForm: FormGroup
  public books: any[]
  constructor(
    private _booksService: BooksService
    ) {
    this.searchForm = new FormGroup({
      serchBook: new FormControl('')
    });

    this.searchForm.valueChanges.pipe(
      debounceTime(1000),
      switchMap((title) => { 
        if(title.serchBook === ''){
          return this._booksService.getBooks()
        }
        return this._booksService.searchBook(`books/${title.serchBook}`)
      })
      ).subscribe(res =>{
        this.books = res;
      });
    }

  ngOnInit() {
    this._booksService.getBooks().subscribe(books => this.books = books)
  }

  addItem(id){
    this._booksService.addBook(this.books.find(book => book._id == id))
  }
  
  
}
