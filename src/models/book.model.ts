export class Book {
  private photo: string = "";
  private synopsis: string = "";
  private id: string = "";
  constructor(public title: string, public author: string) {}
}

export interface BookInterface {
  id: string;
  picture: string;
  synopsis: string;
  title: string;
  author: string;
}

export interface CreateBook {
  picture: string;
  synopsis: string;
  title: string;
  author: string;
}
