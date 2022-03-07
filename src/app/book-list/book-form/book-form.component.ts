import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { BooksService } from "src/app/services/books.service";
import { BookInterface, CreateBook } from "src/models/book.model";

@Component({
  selector: "app-book-form",
  templateUrl: "./book-form.component.html",
  styleUrls: ["./book-form.component.scss"],
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

  public bookForm: FormGroup = this._formBuilder.group({});
  public fileIsUploading = false;
  public fileUrl: string = "";
  public fileUploaded = false;

  public ngOnInit(): void {
    this._initform();
  }

  private _initform() {
    this.newBookFormGroup = this._formBuilder.group({
      titleInput: new FormControl("", []),
      synopsisInput: new FormControl(`Synopsis`, []),
      pictureInput: new FormControl(`Picture`, []),
      authorInput: new FormControl(`Author`, []),
    });
  }

  /**
   * Method used to store the picture once it's selected by the user
   * @param event
   */
  public detectFiles(event: Event) {
    const eventFile = (event?.target as HTMLInputElement).files;
    const file: File | null = eventFile?.item(0) ? eventFile?.item(0) : null;
    file ? this.onUploadFile(file) : null;
  }

  public onUploadFile(file: File | null) {
    this.fileIsUploading = true;
    this._bookService.uploadFile(file).then((url) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    });
  }

  /**
   *
   */
  public async onUploadNewBook() {
    try {
      const newBookToCreate: CreateBook = {
        title: this.newBookFormGroup.value["titleInput"],
        synopsis: this.newBookFormGroup.value["synopsisInput"],
        picture: "",
        author: this.newBookFormGroup.value["authorInput"],
      };
      console.log(`book: ${JSON.stringify(newBookToCreate)}`);
      if (this.fileUrl && this.fileUrl !== "") {
        newBookToCreate.picture = this.fileUrl;
      }
      await this._bookService.createNewBook(newBookToCreate);
      this._router.navigate(["/books"]);
    } catch (error) {
      console.log(error);
    }
  }

  public onCancelNewBook() {
    if (this.fileUrl && this.fileUrl !== "") {
      this._bookService.deleteFile(this.fileUrl);
    } else {
      this._initform();
      this.fileUrl = "";
    }
  }
}
