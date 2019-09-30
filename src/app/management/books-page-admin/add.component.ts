import {Component, OnInit, ViewChild} from '@angular/core';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ShareBookService } from 'src/app/shared/services/hareBook.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BooksService } from 'src/app/shared/services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';



@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  styleUrls: ['books-page-admin.component.scss'],
  templateUrl: 'add.component.html',
  providers: [CommonService]
})
export class AddComponent implements OnInit {
  private _subscription: Subscription
  private bookToPass: any = {}
  private img: any = document.querySelector('.image-input')
  formAddBook: FormGroup;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddComponent>,
    private _shareBookServise: ShareBookService,
    private _bookService: BooksService,
    private _snackBar: MatSnackBar,
    ) {}
  ngOnInit() {
    this._createForm()
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  private _createForm():void{
    this.formAddBook = new FormGroup({
      title: new FormControl(''),
      amount: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      img: new FormControl(''),
    });
  }
  getBase64(file) {
    let imgToShow: any = document.querySelector('.image-input')
    let form: any = this.formAddBook
    var reader = new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onload = function () {
        form.patchValue({img: reader.result })
        imgToShow.src = reader.result
      };
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
  uploadBook(){

    for(let x in this.formAddBook.value){ 
      if(!this.formAddBook.value[x] && x !== 'img') {
        return this.openSnackBar(`Field "${x.toLocaleUpperCase()}" is required`, 'Close')
      } 
    }
    this._bookService.uploadBook(this.formAddBook.value).subscribe((a:any) => {
      if(a.status === 200 || a.status === 201) {
        this._bookService.addBooksData(this.formAddBook.value)
        this._bottomSheetRef.dismiss()
        this.openSnackBar(`${a.message}`, 'Close')
      }else {
        this.openSnackBar(`Error: "${a.statusText}"`, 'Close')
      } 
    })
  }
}