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
  templateUrl: 'edit.component.html',
  providers: [CommonService]
})
export class EditComponent implements OnInit {
  formEditBook: FormGroup;
  private _subscription: Subscription
  private bookToPass: any = {}
  private img: any = document.querySelector('.image-input')
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<EditComponent>,
    private _shareBookServise: ShareBookService,
    private _bookService: BooksService,
    private _snackBar: MatSnackBar,
    ) {}
    
  ngOnInit() {
    this._shareBookServise.passBook$.subscribe(res => {
      this.bookToPass = res
      this.formEditBook.patchValue({
        title: res.title,
        amount: res.amount,
        description: res.description,
        price: res.price,
        img: this.bookToPass.img
      })
    });
    this._createForm()
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  private _createForm():void{
    this.formEditBook = new FormGroup({
      title: new FormControl(''),
      amount: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      img: new FormControl(''),
    });
  }
  getBase64(file) {
    let imgToShow: any = document.querySelector('.image-input')
    let form: any = this.formEditBook
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
  updateBook(id){
    for(let x in this.formEditBook.value){ 
      if(!this.formEditBook.value[x] && x !== 'img') {
        return this.openSnackBar(`Field "${x.toLocaleUpperCase()}" is not updated`, 'Close')
      } 
    }
    let dataToUpdate:any = Object.assign(this.formEditBook.value, {id: id})
    this._bookService.updateBook(id, dataToUpdate).subscribe((a:any) => {
      if(a.status === 200 || a.status === 201) {
        this._bookService.updateBooksData(dataToUpdate)
        this._bottomSheetRef.dismiss()
        this.openSnackBar(`${a.message}`, 'Close')
      }else {
        this.openSnackBar(`Error: "${a.statusText}"`, 'Close')
      } 
    })
  }
}