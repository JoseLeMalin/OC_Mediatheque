import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookInterface } from 'src/models/book.model';
import { AuthService } from '../services/auth.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  public bookList: BookInterface[] = [];
  public bookListSubsc: Subscription = new Subscription();

  constructor(
    private _booksService: BooksService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.bookListSubsc = this._booksService
      .getbookListSubject()
      .subscribe((books: BookInterface[]) => {
        this.bookList = books;
      });
    this._booksService.emitBooks();
  }

  public goToBook(id: string) {
    this._router.navigate([`books/view/:${id}`]);
  }
  public onDelete(bookToDelete: BookInterface): void {
    this._booksService.deleteBook(bookToDelete);
  }

  public onNewBook() {
    this._router.navigate(['/books/new']);
  }

  ngOnDestroy(): void {
    this.bookListSubsc.unsubscribe();
  }
}
