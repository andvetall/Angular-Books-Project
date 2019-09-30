import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { User, Book } from '../../models';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/common.service';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';



@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;


  fillerNavUser = [
    {path : '/management/books', title : 'Books page'},
    {path : '/management/gallery', title : 'Gallery'},
    {path : '/management/user-account', title : "User's Account"},
  ]
  fillerNavAdmin =[
    {path : '/management/books-admin', title : 'Books page Admin'},
    {path : '/management/users-admin', title : 'Users page Admin'},
    // {path : '/management/gallery-admin', title : 'Gallery Admin'},
    {path : '/management/user-account', title : "User's Account"},
  ]

  

  private _mobileQueryListener: () => void;
  private _subscription: Subscription
  private isLoggedIn: boolean = false
  private permission: string = localStorage.getItem("user") ? this._authService.getUserStaroge().permission : null
  private dataUser: Object
  private amountInCart: number = localStorage.getItem("booksInCart") ? 
    JSON.parse(localStorage.getItem("booksInCart")).reduce((a,b) =>  {
    return a + b.count
   },0) : 0
  private booksInCart: Book[] = localStorage.getItem("booksInCart") ? JSON.parse(localStorage.getItem("booksInCart")) : []
  private totalPrice: number 
  
  
  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private _authService: AuthService,
    private _commonServise : LoginService,
    private _router : Router,
    private _bookService : BooksService
    ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      if(this._authService.getUserStaroge() && this._authService.getUserStaroge().permission) {
       this.dataUser = localStorage.getItem("userUpdated") ? 
       Object.assign(JSON.parse(localStorage.getItem('userUpdated')), {
         _id: this._authService.getUserStaroge()._id,
         permission: this._authService.getUserStaroge().permission
        })  : 
           this._authService.getUserStaroge()
      this._subscription = _commonServise.register$.subscribe(res => this.isLoggedIn = true)
      this.plusBook()
      this.minusBook()
    }
    
  }

  ngOnInit(){
    let token = localStorage.getItem('user')
    if(token){
      this.isLoggedIn = true
    }
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  plusBook(){
    this._bookService.addBook$.subscribe((res:Book) => {
      let comp = this.booksInCart.indexOf(res)
      if(comp < 0){
        this.booksInCart.push(Object.assign(res, {count: 1}))
        localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart))
      }else {
        this.booksInCart.forEach(item => {
          item._id === res._id ? item.count++ : null
          localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart))
        })
      }
      this.amountInCart = this.booksInCart.reduce((a,b) =>  {
       return a + b.count
      },0)
      this.totalPrice = this.booksInCart.reduce((a,b) => {
        return +a + +b.price * b.count
      },0)
    })

  }
  minusBook(){
    this._bookService.moveBook$.subscribe((res:Book) => {
      if(res.count > 1){
        res.count--
        localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart))
      }else{
        this.booksInCart.splice( this.booksInCart.findIndex(book => book._id === res._id),1)
        localStorage.setItem("booksInCart", JSON.stringify(this.booksInCart))
      }
      this.amountInCart = this.booksInCart.reduce((a,b) =>  {
        return a + b.count
       },0)
       this.totalPrice = this.booksInCart.reduce((a,b) => {
        return +a + +b.price * b.count
      },0)
    })
  }
  logout() {
    localStorage.clear()
    this.isLoggedIn = false
    this._router.navigate(["auth"])
  }
  addItem(id){
    this._bookService.addBook(this.booksInCart.find(book => book._id == id))
  }
  moveItem(id){
    this._bookService.moveBook(this.booksInCart.find(book => book._id == id))
  }
 

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  

 
}
