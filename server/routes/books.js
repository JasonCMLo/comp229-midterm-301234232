/*

File name: books.js (ROUTES)
Student name: Jason Lo
Student ID: 301234232
Date: October 28, 2022

*/

// This file associates a route with each CRUD or controller function
// and used by each route in the render method as the callback

// modules required for routing
import { Router } from "express";

import {
  displayAddPage,
  displayBookList,
  displayEditPage,
  processAddPage,
  processDelete,
  processEditPage,
} from "../controllers/books.js";

const router = Router();

/* GET books List page. READ */
router.get("/books/list", displayBookList);

//  GET the Book Details page in order to add a new Book
router.get("/books/add", displayAddPage);
// POST process the Book Details page and create a new Book - CREATE
router.post("/books/add", processAddPage);

// GET the Book Details page in order to edit an existing Book
router.get("/books/edit/:id", displayEditPage);

// POST - process the information passed from the details form and update the document
router.post("/books/edit/:id", processEditPage);

// GET - process the delete by user id
router.get("/books/delete/:id", processDelete);

export default router;
