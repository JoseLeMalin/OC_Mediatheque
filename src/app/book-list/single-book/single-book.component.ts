import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BooksService } from "src/app/services/books.service";

@Component({
  selector: "app-single-book",
  templateUrl: "./single-book.component.html",
  styleUrls: ["./single-book.component.scss"],
})
export class SingleBookComponent implements OnInit, OnDestroy {
  @Input() id: string = "";
  @Input() photo: string = "";
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

  ngOnInit(): void {
    this._initFormAddImage();
  }

  private _initFormAddImage() {
    this.addImageFormGroup = this._formBuilder.group({
      fileInput: ["", [Validators.required]],
    });
  }

  public detectFiles(event: Event) {
    const eventFile = (event?.target as HTMLInputElement).files;
    const file: File | null = eventFile?.item(0) ? eventFile?.item(0) : null;

    this._bookService.uploadFile(file);
  }
  /*
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
}
*/
  /**
   *
   * @param event
   */
  public onAddImage(event: File): void {
    //this._bookService.addImageBook(event);
  }
  ngOnDestroy(): void {}
}
