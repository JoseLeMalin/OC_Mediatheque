export class Book {
  private photo: string = '';
  private synopsis: string = '';
  private id: string = '';
  constructor(public title: string, public author: string) {}
}

export interface BookInterface {
  id: string;
  photo: string;
  synopsis: string;
  title: string;
  author: string;
}

export interface CreateBook {
  photo: string;
  synopsis: string;
  title: string;
  author: string;
}
