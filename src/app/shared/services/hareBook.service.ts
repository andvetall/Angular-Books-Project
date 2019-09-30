import {EventEmitter} from '@angular/core';
import { Subject, Observable } from 'rxjs';

export class ShareBookService {
  constructor() { }
  private passBookToUpdate = new Subject<any>();
  passBook$ = this.passBookToUpdate.asObservable();
  
  passBook(data: any) {
  this.passBookToUpdate.next(data)
}

}