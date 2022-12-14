/*

File name: books.js (CONTROLLER)
Student name: Jason Lo
Student ID: 301234232
Date: October 28, 2022

*/

// This file defines the functions to control the CRUD processing of books to be passed on
// and used by each route in the render method as the callback

// define the book model
import booksModel from "../models/books.js";

/* GET books List page. READ */
export function displayBookList(req, res, next) {
  // find all books in the books collection
  booksModel.find((err, booksCollection) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.render("index", {
      title: "Book List",
      page: "books/list",
      books: booksCollection,
    });
  });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {
  res.render("index", { title: "Add Book", page: "books/add", books: {} });
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {
  let newBook = new booksModel({
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });

  booksModel.create(newBook, (err, newBook) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/books/list");
  });
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {
  let bookID = req.params.id;

  booksModel.findById(bookID, (err, book) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.render("index", {
      title: "Edit Book",
      page: "books/edit",
      book: book,
    });
  });
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
  let bookID = req.body.id;

  let editBook = new booksModel({
    _id: bookID,
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });

  booksModel.updateOne({ _id: bookID }, editBook, (err, editBook) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/books/list");
  });
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
  let bookID = req.params.id;

  booksModel.deleteOne({ _id: bookID }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/books/list");
  });
}
