export type Book = {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  imageSrc: string;
  linkSrc: string;
};

export type NotedBookItem = {
  id: string;
  title: string;
  author: string[];
  imageUrl: string;
  googleBooksId: string;
};
