import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book, BookInterface, CreateBook } from "src/models/book.model";
import {
  Database,
  DatabaseReference,
  get,
  getDatabase,
  onValue,
  ref as refDatabase,
  set,
} from "firebase/database";
import { v4 as uuidv4 } from "uuid";
//import { Storage, getStorage} from '@angular/fire/storage';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref as refStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "src/environments/environment";
import { deleteDoc, doc, Firestore, getFirestore } from "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  private _bookList: BookInterface[] = [];
  private _bookListSubject: Subject<BookInterface[]> = new Subject<
    BookInterface[]
  >();
  private _database: Database = getDatabase(firebaseApp);
  private _storage: FirebaseStorage = getStorage(
    firebaseApp,
    "oc-mediatheque.appspot.com/mediatheque_file_storage"
  );
  private _firestore: Firestore = getFirestore(firebaseApp);

  public getbookListSubject(): Subject<BookInterface[]> {
    return this._bookListSubject;
  }
  public emitBooks() {
    this._bookListSubject.next(this._bookList);
  }
  constructor() {
    this.getBookList();
  }

  public async saveBooks(): Promise<unknown> {
    try {
      set(refDatabase(this._database, "/books"), this._bookList);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @param newBook
   * @returns
   */
  public async createNewBook(newBook: CreateBook): Promise<unknown> {
    try {
      const newBookToCreate: BookInterface = {
        id: uuidv4(),
        picture: newBook.picture,
        synopsis: newBook.synopsis,
        title: newBook.title,
        author: newBook.author,
      };
      this._bookList.push(newBookToCreate);
      console.log(`this._bookList: ${JSON.stringify(this._bookList)}`);

      this.saveBooks();
      this.emitBooks();
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @param bookToRemove
   * @returns
   */
  public async deleteBook(bookToRemove: BookInterface): Promise<unknown> {
    try {
      console.log(`bookToRemove.picture: ${bookToRemove.picture}`);
      if (bookToRemove.picture) {
        await deleteDoc(doc(this._firestore, bookToRemove.picture));
      }
      const bookIndexToRemove = this._bookList.findIndex((book) => {
        if (book === bookToRemove) {
          return true;
        }
        return false;
      });

      this._bookList.splice(bookIndexToRemove, 1);
      this.saveBooks();
      this.emitBooks();

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Delete file stored in the database if the user doesn't save the book
   * @param fileUrl
   */
  public deleteFile(fileUrl: string) {}

  /**
   * Get all books stored in database
   */
  public async getBookList() {
    try {
      const bookList = refDatabase(this._database, "/books");

      onValue(bookList, (snapshot) => {
        const data = snapshot.val();
        data ? (this._bookList = data) : (this._bookList = []);
        console.log(JSON.stringify(data));

        this.emitBooks();
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  public async getSingleBook(id: number): Promise<unknown> {
    try {
      const singleBook: DatabaseReference = refDatabase(
        this._database,
        "/books/" + id
      );
      onValue(singleBook, (snapshot) => {
        const data = snapshot.val();
        return Promise.resolve(data);
      });
    } catch (error) {
      return Promise.reject(error);
    }
    return Promise.reject();
  }

  /**
   *
   * @param fileInput
   */
  public async uploadFile(fileInput: File | null): Promise<string> {
    try {
      if (fileInput === null) return Promise.reject();
      // Create a reference to picture
      const storage = getStorage();
      console.log(`storage: ${JSON.stringify(storage)}`);
      const uuidFile = uuidv4();
      // Create a reference to '/mediatheque_file_storage'
      const pictureStorageRef = refStorage(
        storage,
        `gs://oc-mediatheque.appspot.com/mediatheque_file_storage/${uuidFile}-${fileInput?.name}`
      );

      const newBlob = new Blob([fileInput], {
        type: "application/json",
      });
      console.log(`newBlob: ${JSON.stringify(newBlob)}`);
      const metadata = {
        contentType: "image/jpeg",
      };

      await uploadBytesResumable(pictureStorageRef, newBlob, metadata).then(
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
          console.log("Uploaded a blob or file!");
          console.log(`newBlob: ${JSON.stringify(newBlob)}`);
        }
      );
      console.log(`metadata: ${JSON.stringify(metadata)}`);

      const urlPicture = await getDownloadURL(pictureStorageRef);
      console.log(`urlPicture: ${urlPicture}`);
      return Promise.resolve(urlPicture);
    } catch (error) {
      console.log(`error: ${error}`);
      return Promise.reject("Error");
    }
  }
}
