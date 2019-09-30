import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

constructor(private _httpClient : HttpClient) { }
    private addBookToCart = new Subject<any>();
    private moveBookFromCart = new Subject<any>();
    private booksDataUpdate = new Subject<any>()

    addBook$ = this.addBookToCart.asObservable();
    moveBook$ = this.moveBookFromCart.asObservable();
    updateBooksData$ = this.booksDataUpdate.asObservable()
    addBooksData$ = this.booksDataUpdate.asObservable()

  getBooks() : Observable<any>{
    return this._httpClient.get(`${environment.apiUrl}books`)
  }
  searchBook(url: string): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}${url}`).pipe(
        catchError(err => of(null))
    );
  }
  updateBook(id:any, body:any) : Observable<any>{
    return this._httpClient.put(`${environment.apiUrl}books/${id}`, body)
  }
  uploadBook(body:any) : Observable<any>{
    return this._httpClient.post(`${environment.apiUrl}books`, body)
  }
  updateBooksData(data){
    return this.booksDataUpdate.next(data)
  }
  addBooksData(data){
    return this.booksDataUpdate.next(data)
  }
  
  addBook(bookData: any) {
    this.addBookToCart.next(bookData)
  }
  moveBook(bookData: any) {
    this.moveBookFromCart.next(bookData)
  }
  

}
