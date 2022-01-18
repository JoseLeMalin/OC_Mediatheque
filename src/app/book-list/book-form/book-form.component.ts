import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';
import { BookInterface, CreateBook } from 'src/models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  // public formBuilder: FormBuilder = new FormBuilder();
  public newBookFormGroup: FormGroup = this._formBuilder.group({});
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _bookService: BooksService
  ) {}

  public ngOnInit(): void {
    this._initform();
  }

  private _initform() {
    this.newBookFormGroup = this._formBuilder.group({
      titleInput: new FormControl(`Test`, []),
      synopsisInput: new FormControl(`Test`, []),
      photoInput: new FormControl(`Test`, []),
      authorInput: new FormControl(`Test`, []),
    });
  }

  public async onSubmit() {
    try {
      const newBookToCreate: CreateBook = {
        title: this.newBookFormGroup.value['titleInput'],
        synopsis: this.newBookFormGroup.value['synopsisInput'],
        photo: this.newBookFormGroup.value['photoInput'],
        author: this.newBookFormGroup.value['authorInput'],
      };
      console.log(`book: ${JSON.stringify(newBookToCreate)}`);

      // const title: string = this.newBookFormGroup.value['titleInput'];
      // const synopsis: string = this.newBookFormGroup.value['synopsisInput'];
      // const photo: string = this.newBookFormGroup.value['photoInput'];
      // const author: string = this.newBookFormGroup.value['authorInput'];
      await this._bookService.createNewBook(newBookToCreate);
      this._router.navigate(['books']);
    } catch (error) {
      console.log(error);
    }
  }
}
