import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BooksService } from "src/app/services/books.service";
import { BookInterface } from "src/models/book.model";

@Component({
  selector: "app-single-book",
  templateUrl: "./single-book.component.html",
  styleUrls: ["./single-book.component.scss"],
})
export class SingleBookComponent implements OnInit, OnDestroy {
  @Input() id: string = "";
  @Input() picture: string = "";
  @Input() synopsis: string = "";
  @Input() title: string = "";
  @Input() author: string = "";
  @Input() fileInput: string = "";

  constructor(
    private _bookService: BooksService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  public addImageFormGroup: FormGroup = this._formBuilder.group({});
  private _singleBook: BookInterface = {
    id: this.id,
    author: this.author,
    picture: this.picture,
    synopsis: this.synopsis,
    title: this.title,
  };

  ngOnInit(): void {
    this._initFormAddImage();
  }

  private _initFormAddImage() {
    this.addImageFormGroup = this._formBuilder.group({
      fileInput: ["", [Validators.required]],
    });
  }

  /*
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
}
*/

  public async deleteBook() {
    console.log(
      `Dans le deleteBooksingle: ${JSON.stringify(this._singleBook)}`
    );

    this._bookService.deleteBook(this._singleBook);
  }

  /**
   *
   * @param event
   */
  public onAddImage(event: File): void {
    //this._bookService.addImageBook(event);
  }
  ngOnDestroy(): void {}
}
