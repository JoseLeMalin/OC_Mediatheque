import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss'],
})
export class SingleBookComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  @Input() photo: string = '';
  @Input() synopsis: string = '';
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() fileInput: string = '';
  constructor(
    private _bookService: BooksService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  public addImageFormGroup: FormGroup = this._formBuilder.group({});
  public onAddImage(event: Event): void {
    this._bookService.addImageBook();
  }
  ngOnInit(): void {
    this._initFormAddImage();
  }

  private _initFormAddImage() {
    this.addImageFormGroup = this._formBuilder.group({
      fileInput: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {}
}
