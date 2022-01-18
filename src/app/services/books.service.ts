import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book, BookInterface, CreateBook } from 'src/models/book.model';
import {
  Database,
  DatabaseReference,
  get,
  getDatabase,
  onValue,
  ref as refDatabase,
  set,
} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
//import { Storage, getStorage} from '@angular/fire/storage';
import {
  FirebaseStorage,
  getStorage,
  ref as refStorage,
  uploadBytes,
} from 'firebase/storage';
import { firebaseApp } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _bookList: BookInterface[] = [];
  private _bookListSubject: Subject<BookInterface[]> = new Subject<
    BookInterface[]
  >();
  private _database: Database = getDatabase(firebaseApp);
  private _storage: FirebaseStorage = getStorage(
    firebaseApp,
    'oc-mediatheque.appspot.com/mediatheque_file_storage'
  );

  public getFirebaseDb(): Database {
    return this._database;
  }

  public getbookListSubject(): Subject<BookInterface[]> {
    return this._bookListSubject;
  }
  public emitBooks() {
    this._bookListSubject.next(this._bookList);
  }
  constructor() {
    this.getBookList();
    console.log(`Constructeur après getboolist: ${this._bookList}`);
  }

  public async saveBooks(): Promise<unknown> {
    try {
      set(refDatabase(this.getFirebaseDb(), '/books'), this._bookList);
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
        photo: newBook.photo,
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
   * Get all books stored in database
   */
  public async getBookList() {
    try {
      const bookList = refDatabase(this.getFirebaseDb(), '/books');

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
        this.getFirebaseDb(),
        '/books/' + id
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

  public async addImageBook(): Promise<void> {
    try {
      const fileInput: string = '';
      // Create a reference to picture
      const storage = getStorage();
      console.log(`storage: ${JSON.stringify(storage)}`);

      // Create a reference to '/mediatheque_file_storage'
      const pictureStorageRef = refStorage(
        storage,
        `gs://oc-mediatheque.appspot.com/mediatheque_file_storage/${uuidv4}`
      );

      //const filetest: File = 'src/assets/EPP_Salut.gif';

      const newBlob = new Blob([JSON.stringify(fileInput)], {
        type: 'application/json',
      });
      console.log(`newBlob: ${JSON.stringify(newBlob)}`);

      /*
      await uploadBytes(pictureStorageRef, newBlob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(`newBlob: ${JSON.stringify(newBlob)}`);
      });
      */
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }
}
